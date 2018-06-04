import React, { Component } from "react";
import { Container } from "flux/utils";
import BlankPage from "../pages/BlankPage";
import DummyStore from "../../stores/LineChartStore";

class BlankContainer extends Component {
  static getStores() {
    return [DummyStore];
  }

  static calculateState() {
    return {
      data: DummyStore.getState()
    };
  }

  render() {
    const { ...other } = this.props;
    return (
      <div className="blank-container">
        <BlankPage {...other} />
      </div>
    );
  }
}

export default Container.create(BlankContainer);
