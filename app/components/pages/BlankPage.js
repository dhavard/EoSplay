import PropTypes from "prop-types";
import React, { Component } from "react";

export default class BlankPage extends Component {
  static propTypes = {};
  static defaultProps = {};

  static contextTypes = {
    muiFjTheme: PropTypes.object.isRequired
  };

  static getStyles(context) {
    const { palette } = context.muiFjTheme;
    const space = 16;
    const styles = {
      title: {
        fontSize: 28,
        fontWeight: 800,
        color: palette.primary1Color,
        marginTop: space,
        marginLeft: space
      }
    };

    return styles;
  }

  render() {
    const styles = BlankPage.getStyles(this.context);

    return <div style={styles.title}>Blank Page</div>;
  }
}
