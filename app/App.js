import PropTypes from "prop-types";
import React, { Component } from "react";
import { render } from "react-dom";
import { Router, Route, hashHistory, IndexRoute } from "react-router";
import DashboardPage from "./components/pages/DashboardPage";

class App extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  static defaultProps = {};

  render() {
    return this.props.children;
  }
}

render(
  <Router history={hashHistory} basename={process.env.PUBLIC_URL}>
    <Route path="/" component={App}>
      <IndexRoute component={DashboardPage} />
      <Route path="/dashboard" component={DashboardPage} />
    </Route>
  </Router>,
  document.getElementById("root")
);
