import { ReduceStore } from 'flux/utils';
import { ActionTypes } from '../constants/AppConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';

class PieChartStore extends ReduceStore {
  getInitialState() {
    return {
      data: [],
    };
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.GET_PIE_CHART_DATA: {
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

export default new PieChartStore(AppDispatcher);
