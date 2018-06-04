import React, { Component } from "react";
import { Container } from "flux/utils";
import CharacterListPage from "../pages/CharacterListPage";
import CharacterListStore from "../../stores/CharacterListStore";
import CharacterListActionCreators from "../../actions/CharacterListActionCreators";

class CharacterListContainer extends Component {
  static getStores() {
    return [CharacterListStore];
  }

  static calculateState() {
    return {
      character: CharacterListStore.getState()
    };
  }

  componentWillMount() {
    CharacterListActionCreators.getCharacterListData({
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
      <div className="character-list-container">
        <CharacterListPage
          characterListData={this.state.character.data}
          {...other}
        />
      </div>
    );
  }
}

export default Container.create(CharacterListContainer);
