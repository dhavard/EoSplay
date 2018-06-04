import PropTypes from "prop-types";
import React, { Component } from "react";

export default class CharacterPage extends Component {
  static propTypes = {
    characterData: PropTypes.shape({
      name: PropTypes.string,
      gears: PropTypes.arrayOf(
        PropTypes.shape({
          lodestone_id: PropTypes.number,
          classjob_id: PropTypes.number,
          level: PropTypes.number,
          role: PropTypes.shape({
            name: PropTypes.string,
            icon: PropTypes.string
          }),
          item_level_avg: PropTypes.number
        })
      )
    })
  };

  static defaultProps = {};

  render() {
    const {
      characterData
    } = this.props;

    if (
      characterData===null || !characterData.gears
    ) {
     return null;
    }
    else {
      console.log( "Character Data at Render: ");
      console.log( characterData );
    }

    return (
        <div>
        <div>
          <div> Character Stats </div>
          <div> Echo of Stars </div>
        </div>
          <div>
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Class</th>
                    <th>Level</th>
                    <th>Item Level</th>
                  </tr>
                </thead>
                <tbody>
                  {characterData.gears.map(n => {
                    var k = n.lodestone_id + "_" + n.classjob_id;

                    if( n.level < 70 ) {
                      return
                    }

                    return (
                      <tr key={k}>
                        <td scope="row">
                          {n.role.name}
                        </td>
                        <td>{n.level}</td>
                        <td>{n.item_level_avg}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          </div>
    );
  }
}
