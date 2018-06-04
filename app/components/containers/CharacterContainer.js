import React, { Component } from "react";
import { Container } from "flux/utils";
import CharacterPage from "../pages/CharacterPage";
import CharacterStore from "../../stores/CharacterStore";
import CharacterActionCreators from "../../actions/CharacterActionCreators";

class CharacterContainer extends Component {
  static getStores() {
    return [CharacterStore];
  }

  static calculateState() {
    return {
      character: CharacterStore.getState()
    };
  }

  componentWillMount() {
    CharacterActionCreators.getCharacterData({
      resolve: () => {
        // @todo handle success
      },
      // eslint-disable-next-line
      reject: error => {
        // @todo handle error
      }
    });
  }

  render() {
    const { ...other } = this.props;
    return (
      <div className="character-container">
        <CharacterPage
          characterData={this.state.character.data}
          {...other}
        />
      </div>
    );
  }
}

export default Container.create(CharacterContainer);
