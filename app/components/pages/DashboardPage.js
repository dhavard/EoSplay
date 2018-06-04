import PropTypes from "prop-types";
import React, { Component } from "react";
import MediaQuery from "react-responsive"; // @see https://www.npmjs.com/package/react-responsive
import { AppBar, Drawer } from "material-ui";
import MenuItem from "material-ui/MenuItem";
import Dashboard from "material-ui/svg-icons/action/dashboard";
import Help from "material-ui/svg-icons/action/help";
import Favorite from "material-ui/svg-icons/action/favorite";
import Settings from "material-ui/svg-icons/action/settings";
import { grey100 } from "material-ui/styles/colors";
import { lighten, fade } from "material-ui/utils/colorManipulator";
import { BaseLayout } from "material-ui-fj/layouts";
import { VerticalLayout } from "material-ui-fj/sublayouts";
import { OneRowHeader } from "material-ui-fj/Header";
import { Footer003 } from "material-ui-fj/Footer";
import { SectionWrapper003 } from "material-ui-fj/SectionWrapper";
import { SidebarMenu } from "material-ui-fj/SidebarMenu";
import { Background } from "material-ui-fj/Background";
import ReportContainer from "../containers/ReportContainer";
import CharacterContainer from "../containers/CharacterContainer";
import BlankContainer from "../containers/BlankContainer";

export default class DashboardPage extends Component {
  static contextTypes = {
    muiFjTheme: PropTypes.object.isRequired
  };

  static propTypes = {};

  static defaultProps = {};
  static getStyles(context) {
    const { serviceBrand } = context.muiFjTheme;
    const styles = {
      list: {
        display: "static",
        width: "100%"
      },

      left: {
        width: 220,
        backgroundColor: grey100
      },

      top: {
        overflow: "hidden"
      },

      title: {
        fontFamily: serviceBrand.fontFamily,
        fontSize: 16,
        fontWeight: serviceBrand.fontWeight ? serviceBrand.fontWeight : 300
      },

      drawerContainer: {
        display: "flex"
      },

      drawer: {
        display: "flex",
        flex: "1 1 auto"
      }
    };

    return styles;
  }

  state = {
    displayPage: 0,
    openDrawer: false
  };

  handleClick = (event, menuItem, index) => {
    this.setState({ displayPage: index });
  };

  render() {
    const { ...other } = this.props;
    const styles = DashboardPage.getStyles(this.context);
    const iconColor = fade(
      lighten(this.context.muiFjTheme.palette.primary1Color, 0.3),
      0.8
    );

    const title = "Playground Application";

    const top = <OneRowHeader title={title} />;

    const pages = [
      //<ReportContainer {...other} />,
      <BlankContainer {...other} />,
      <CharacterContainer {...other} />,
      <BlankContainer {...other} />,
      <BlankContainer {...other} />
    ];

    const center = <Background>{pages[this.state.displayPage]}</Background>;

    const left = (
      <SectionWrapper003>
        <VerticalLayout expandable>
          <SidebarMenu
            onItemTouchTap={this.handleClick}
            autoWidth={false}
            listStyle={styles.list}
            value={this.state.displayPage}
          >
            <MenuItem
              value={0}
              primaryText="Dashboard"
              leftIcon={<Dashboard color={iconColor} />}
            />

            <MenuItem
              value={1}
              primaryText="Character"
              leftIcon={<Favorite color={iconColor} />}
            />

            <MenuItem
              value={2}
              primaryText="Menu 2"
              leftIcon={<Settings color={iconColor} />}
            />

            <MenuItem
              value={3}
              primaryText="Menu 3"
              leftIcon={<Help color={iconColor} />}
            />
          </SidebarMenu>
        </VerticalLayout>
      </SectionWrapper003>
    );

    const bottom = <Footer003 />;

    const appBar = (
      <div>
        <AppBar
          title={title}
          titleStyle={styles.title}
          onLeftIconButtonTouchTap={() =>
            this.setState({ openDrawer: !this.state.openDrawer })}
        />

        <Drawer
          docked={false}
          width={220}
          open={this.state.openDrawer}
          onRequestChange={open => this.setState({ openDrawer: open })}
          containerStyle={styles.drawerContainer}
          style={styles.drawer}
        >
          {left}
        </Drawer>
      </div>
    );

    return (
      <div>
        <MediaQuery minWidth={700}>
          <BaseLayout
            top={top}
            topStyle={styles.top}
            center={center}
            left={left}
            leftStyle={styles.left}
            bottom={bottom}
            fixed={false}
          />
        </MediaQuery>
        <MediaQuery maxWidth={699}>
          <BaseLayout
            top={appBar}
            center={center}
            bottom={bottom}
            fixed={false}
          />
        </MediaQuery>
      </div>
    );
  }
}
