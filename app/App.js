import PropTypes from "prop-types";
import React, { Component } from "react";
import { render } from "react-dom";
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import MuiFjThemeProvider from "material-ui-fj/styles/MuiFjThemeProvider";
import getMuiFjTheme from "material-ui-fj/styles/getMuiFjTheme";
import { Natural05 } from "material-ui-fj/styles/baseThemes";
import injectTapEventPlugin from "react-tap-event-plugin";
import DashboardPage from "./components/pages/DashboardPage";
import setFontFamily from "material-ui-fj/styles/setFontFamily";
const theme = setFontFamily(Natural05, "Laila", "Open Sans");
theme.serviceBrand.fontWeight = 300;

const muiFjTheme = getMuiFjTheme(theme);

class App extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  static defaultProps = {};

  render() {
    return (
      <MuiFjThemeProvider muiFjTheme={muiFjTheme}>
        {this.props.children}
      </MuiFjThemeProvider>
    );
  }
}

injectTapEventPlugin();

render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={DashboardPage} />
      <Route path="/dashboard" component={DashboardPage} />
    </Route>
  </Router>,
  document.getElementById("root")
);
