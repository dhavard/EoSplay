import { ReduceStore } from 'flux/utils';
import { ActionTypes } from '../constants/AppConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';

class CharacterListStore extends ReduceStore {
  getInitialState() {
    return {
      data: [],
    };
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.GET_CHARACTER_LIST_DATA: {
        return {
          data: action.data,
        };
      }
      default: {
        return state;
      }
    }
  }
}

export default new CharacterListStore(AppDispatcher);
