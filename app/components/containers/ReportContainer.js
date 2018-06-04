import React, { Component } from "react";
import { Container } from "flux/utils";
import ReportPage from "../pages/ReportPage";
import LineChartStore from "../../stores/LineChartStore";
import PieChartStore from "../../stores/PieChartStore";
import TableStore from "../../stores/TableStore";
import NumberCardStore from "../../stores/NumberCardStore";
import LineChartActionCreators from "../../actions/LineChartActionCreators";
import PieChartActionCreators from "../../actions/PieChartActionCreators";
import TableActionCreators from "../../actions/TableActionCreators";
import NumberCardActionCreators from "../../actions/NumberCardActionCreators";

class ReportContainer extends Component {
  static getStores() {
    return [LineChartStore, PieChartStore, TableStore, NumberCardStore];
  }

  static calculateState() {
    return {
      lineChart: LineChartStore.getState(),
      pieChart: PieChartStore.getState(),
      table: TableStore.getState(),
      numberCard: NumberCardStore.getState()
    };
  }

  componentWillMount() {
    LineChartActionCreators.getLineChartData({
      resolve: () => {
        // @todo handle success
      },
      // eslint-disable-next-line
      reject: error => {
        // @todo handle error
      }
    });

    PieChartActionCreators.getPieChartData({
      resolve: () => {
        // @todo handle success
      },
      // eslint-disable-next-line
      reject: error => {
        // @todo handle error
      }
    });

    TableActionCreators.getTableData({
      resolve: () => {
        // @todo handle success
      },
      // eslint-disable-next-line
      reject: error => {
        // @todo handle error
      }
    });

    NumberCardActionCreators.getNumberCardData({
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
      <div className="report-container">
        <ReportPage
          lineChartData={this.state.lineChart.data}
          pieChartData={this.state.pieChart.data}
          tableData={this.state.table.data}
          numberCardData={this.state.numberCard.data}
          {...other}
        />
      </div>
    );
  }
}

export default Container.create(ReportContainer);
