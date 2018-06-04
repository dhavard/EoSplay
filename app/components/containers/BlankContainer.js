import React, { Component } from "react";
import { Container } from "flux/utils";
import BlankPage from "../pages/BlankPage";

class BlankContainer extends Component {
  static getStores() {
    return [];
  }

  static calculateState() {
    return {
      data: []
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
