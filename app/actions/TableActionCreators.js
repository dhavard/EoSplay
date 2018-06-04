import axios from "axios"; // @see https://www.npmjs.com/package/axios
import AppDispatcher from "../dispatcher/AppDispatcher";
import { ActionTypes } from "../constants/AppConstants";
import config from "../config";

const api = axios.create({
  baseURL: config.apiServer.url
});

const TableActionCreators = {
  getTableData({ resolve, reject }) {
    api
      .get("/sample_chartdata/table")
      .then(response => {
        AppDispatcher.dispatch({
          type: ActionTypes.GET_TABLE_DATA,
          data: response.data.tableData
        });

        resolve();
      })
      .catch(error => {
        reject(error);
      });
  }
};

export default TableActionCreators;
