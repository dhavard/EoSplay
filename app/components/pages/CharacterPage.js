import PropTypes from "prop-types";
import React, { Component } from "react";
import { grey50, grey800, lightBlack } from "material-ui/styles/colors";
import FjVictoryTheme from "material-ui-fj/styles/FjVictoryTheme";
import {
  ItemsWrapperResponsive,
  VerticalLayout
} from "material-ui-fj/sublayouts";
import { BasicCard } from "material-ui-fj/Card";
import { Table002 } from "material-ui-fj/Table";

export default class CharacterPage extends Component {
  static propTypes = {
    characterData: PropTypes.shape({
      name: PropTypes.string,
      gears: PropTypes.arrayOf(
        PropTypes.shape({
          lodestone_id: PropTypes.number,
          classjob_id: PropTypes.number,
          level: PropTypes.number,
          role: PropTypes.shape({
            name: PropTypes.string,
            icon: PropTypes.string
          }),
          item_level_avg: PropTypes.number
        })
      )
    })
  };

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
        color: grey800,
        marginTop: space,
        marginLeft: space
      },

      subtitle: {
        fontSize: 14,
        fontWeight: 300,
        color: palette.accent1Color,
        marginLeft: space,
        marginBottom: space
      },

      header: {
        padding: 8,
        margin: 0,
        backgroundColor: grey50,
        borderLeft: `5px solid ${palette.primary1Color}`
      },

      headerTitle: {
        color: palette.primary1Color,
        fontSize: 14,
        fontWeight: 500,
        padding: 0,
        margin: 0
      },

      numberCard: {
        fontSize: 48,
        fontWeight: 100,
        color: palette.accent1Color,
        textAlign: "center",
        padding: "24px 8px",
        margin: 0
      },

      numberUnit: {
        fontSize: 12,
        fontWeight: 300,
        color: lightBlack,
        textAlign: "center",
        margin: 0
      },

      verticalLayout: {
        padding: space / 2,
        paddingTop: space,
        margin: "0 auto"
      },

      cardContent: {
        padding: 4,
        boxSizing: "border-box"
      },

      cardPieContent: {
        padding: 24,
        boxSizing: "border-box"
      },

      cardTableContent: {
        padding: 16
      },

      responsiveColumn: {
        display: "flex",
        flexWrap: "wrap"
      },

      card: {
        margin: "8px",
        flexShrink: 1,
        flexGrow: 1
      },

      tableWrapper: {
        width: "100%",
        overflow: "auto"
      },

      tableWrapperInner: {
        width: "100%",
        minWidth: 300
      }
    };

    return styles;
  }

  render() {
    const {
      characterData
    } = this.props;

    if (
      characterData===null || !characterData.gears
    ) {
     return null;
    }
    else {
      console.log( "Character Data at Render: ");
      console.log( characterData );
    }

    const { muiFjTheme } = this.context;

    const styles = CharacterPage.getStyles(this.context);

    const theme = FjVictoryTheme.getTheme(
      muiFjTheme.palette.primary1Color,
      muiFjTheme.palette.accent1Color
    );

    return (
        <div>
        <div>
          <div style={styles.title}> Character Stats </div>
          <div style={styles.subtitle}> Echo of Stars </div>
        </div>
          <div style={styles.tableWrapper}>
            <div style={styles.tableWrapperInner}>
            <BasicCard
              headerTitle={"Detail"}
              headerStyle={styles.header}
              headerTitleStyle={styles.headerTitle}
              style={styles.card}
              contentStyle={styles.cardTableContent}
              className="dashboard-card">
              <div style={styles.tableWrapper}>
                <div style={styles.tableWrapperInner}>
                  <Table002 reportData={characterData.gearsTable} />
                </div>
              </div>
            </BasicCard>
              <table>
                <thead>
                  <tr>
                    <th>Class</th>
                    <th>Level</th>
                    <th>Item Level</th>
                  </tr>
                </thead>
                <tbody>
                  {characterData.gears.map(n => {
                    var k = n.lodestone_id + "_" + n.classjob_id;

                    if( n.level < 70 ) {
                      return
                    }

                    return (
                      <tr key={k}>
                        <td scope="row">
                          {n.role.name}
                        </td>
                        <td>{n.level}</td>
                        <td>{n.item_level_avg}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          </div>
    );
  }
}
