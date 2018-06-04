import { ReduceStore } from 'flux/utils';
import { ActionTypes } from '../constants/AppConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';

class CharacterStore extends ReduceStore {
  getInitialState() {
    return {
      data: null,
    };
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.GET_CHARACTER_DATA: {
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

export default new CharacterStore(AppDispatcher);
