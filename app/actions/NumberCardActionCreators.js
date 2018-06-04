import axios from "axios"; // @see https://www.npmjs.com/package/axios
import AppDispatcher from "../dispatcher/AppDispatcher";
import { ActionTypes } from "../constants/AppConstants";
import config from "../config";

const api = axios.create({
  baseURL: config.apiServer.url
});

const NumberCardActionCreators = {
  getNumberCardData({ resolve, reject }) {
    api
      .get("/sample_chartdata/number")
      .then(response => {
        AppDispatcher.dispatch({
          type: ActionTypes.GET_NUMBER_CARD_DATA,
          data: response.data.chartData
        });

        resolve();
      })
      .catch(error => {
        reject(error);
      });
  }
};

export default NumberCardActionCreators;
