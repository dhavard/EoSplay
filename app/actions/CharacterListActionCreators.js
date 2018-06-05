import axios from "axios"; // @see https://www.npmjs.com/package/axios
import AppDispatcher from "../dispatcher/AppDispatcher";
import { ActionTypes } from "../constants/AppConstants";
import config from "../config";

//https://api.xivdb.com/character/15692324
//https://api.xivdb.com/character/15692324?data=gearsets

const api = axios.create({
  baseURL: config.apiServer.url
});

const chars = [
    '18344882', //alpha from here
    '11908746',
    '17566751',
    '16919038',
    '13211372',
    '5927518',
    '15479062',
    '20429084',
    '142664',
    '15152197',
    '18436960',
    '6156953',
    '16372821',
    '8350322',
    '11897881',
    '18773869',
    '12558325',
    '2315478',
    '17346344',
    '17122524',
    '18322406',
    '16114239',
    '19128976',
    '19797055',
    '5819754',
    '16419341',
    '16347605',
    '17724123',
    '11962979',
    '14068063',
    '18723900',
    '20781670',
    '17201748',
    '18440607',
    '18792285',
    '15692324', //ral
    '4567071',
    '19034107',
    '13833338',
    '12477082',
    '16891589',
    '7593593',
    '21161081'
];

function fallbackCall({resolve, reject}, current, characters) {
    current--;
    var url = "https://xivsync.com/character/parse/" + chars[current];
    current++;
    api.get(url)
        .then( characterResponse => {
            characterResponse.data.data.lodestone_id = characterResponse.data.data.id;
            characterResponse.data.data.gears = Object.values(characterResponse.data.data.classjobs);
            characterResponse.data.data.gears.map( (g) => {
                g.classjob_id = g.name;
                g.role = { name: g.name };
                return g;
            })

            //console.log( "Backup data" );
            //console.log( characterResponse.data.data );
            characters.push(characterResponse.data.data);
            getItemData( {resolve, reject}, current, characters );
        })
        .catch(error => {
            //console.log( "Error requesting backup character data" );
            //console.log( {error} );
            if( current < 51 && error.response && error.response.status === 404)
            getItemData( {resolve, reject}, current, characters );
        });
}

function getItemData({resolve, reject}, current, characters) {
    var url = "https://api.xivdb.com/character/" + chars[current];
    current++;
    if( current % 5 === 0 ) {
        AppDispatcher.dispatch({
            type: ActionTypes.GET_CHARACTER_LIST_DATA,
            data: characters
        });
    }
    if (current >= chars.length || current > 50) {
        //console.log( "Character List Data at Fetch" );
        //console.log( characters );
        AppDispatcher.dispatch({
            type: ActionTypes.GET_CHARACTER_LIST_DATA,
            data: characters
        });

        resolve();
    }
    else {
        api.get(url)
        .then( characterResponse => {
            api
            .get("https://api.xivdb.com/character/" + chars[current- 1] + "?data=gearsets")
            .then(gearResponse => {
                //console.log({c: characterResponse.data.name, g: gearResponse.data.length, cf: characterResponse, gf: gearResponse});
                
                const m = new Map();
                gearResponse.data.map( (gear) => {
                    m.set( gear.role.name, gear);
                    return gear;
                })
                
                characterResponse.data.gears = Object.values(characterResponse.data.data.classjobs);
                characterResponse.data.gears.map( (g) => {
                    g.classjob_id = g.name;
                    g.role = { name: g.name, id: g.id };

                    if( m.has(g.name) ) {
                        var gi = m.get( g.name );
                        g.item_level_avg = gi.item_level_avg;
                        g.gear.slot_soulcrystal = gi.gear.slot_soulcrystal;
                    }

                    return g;
                })

                characters.push(characterResponse.data);
                getItemData( {resolve, reject}, current, characters );
            })
            .catch(error => {
                //reject(error);
                //console.log( "Error requesting gear data" );
                //console.log( {error} );
                fallbackCall( {resolve, reject}, current, characters );
            });
            })
            .catch(error => {
                //reject(error);
                //console.log( "Error requesting character data" );
                //console.log( {error} );
                fallbackCall( {resolve, reject}, current, characters );
            });
    }
};

const CharacterListActionCreators = {
  getCharacterListData({ resolve, reject }) {
    getItemData({ resolve, reject }, 0, []);
  }
};

export default CharacterListActionCreators;
