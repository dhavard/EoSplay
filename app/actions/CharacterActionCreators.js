import axios from "axios"; // @see https://www.npmjs.com/package/axios
import AppDispatcher from "../dispatcher/AppDispatcher";
import { ActionTypes } from "../constants/AppConstants";
import config from "../config";

//https://api.xivdb.com/character/15692324
//https://api.xivdb.com/character/15692324?data=gearsets

const api = axios.create({
  baseURL: config.apiServer.url
});

const CharacterActionCreators = {
  getCharacterData({ resolve, reject }) {
    api
      .get("/character/15692324")
      .then(characterResponse => {
        api
        .get("/character/15692324?data=gearsets")
        .then(gearResponse => {

            characterResponse.data.gears = gearResponse.data;

            var result = gearResponse.data.map( e => {
                return {
                    key_id:e.lodestone_id + "-" + e.classjob_id,
                    level:e.level,
                    role_name:e.role.name,
                    item_level_avg:e.item_level_avg
                }
            });
            characterResponse.data.gearsTable = result;
            
            console.log( "Character Data at Fetch" );
            console.log( characterResponse.data );

            AppDispatcher.dispatch({
                type: ActionTypes.GET_CHARACTER_DATA,
                data: characterResponse.data
            });

            resolve();
        })
        .catch(error => {
            reject(error);
        });
      })
      .catch(error => {
        reject(error);
      });
  }
};

export default CharacterActionCreators;
