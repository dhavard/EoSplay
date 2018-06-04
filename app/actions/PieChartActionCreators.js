import axios from "axios"; // @see https://www.npmjs.com/package/axios
import AppDispatcher from "../dispatcher/AppDispatcher";
import { ActionTypes } from "../constants/AppConstants";
import config from "../config";

const api = axios.create({
  baseURL: config.apiServer.url
});

const PieChartActionCreators = {
  getPieChartData({ resolve, reject }) {
    api
      .get("/sample_chartdata/pie")
      .then(response => {
        AppDispatcher.dispatch({
          type: ActionTypes.GET_PIE_CHART_DATA,
          data: response.data.chartData
        });

        resolve();
      })
      .catch(error => {
        reject(error);
      });
  }
};

export default PieChartActionCreators;
