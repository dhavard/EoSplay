import PropTypes from "prop-types";
import React, { Component } from "react";
import { grey50, grey800, lightBlack } from "material-ui/styles/colors";
import FjVictoryTheme from "material-ui-fj/styles/FjVictoryTheme";
import {
  ItemsWrapperResponsive,
  VerticalLayout
} from "material-ui-fj/sublayouts";
import { BasicCard } from "material-ui-fj/Card";
import { LineChart, PieChart002 } from "material-ui-fj/Chart";
import { Table002 } from "material-ui-fj/Table";

export default class ReportPage extends Component {
  static propTypes = {
    lineChartData: PropTypes.arrayOf(
      PropTypes.arrayOf(
        PropTypes.shape({
          x: PropTypes.number,
          y: PropTypes.number
        })
      )
    ).isRequired,
    pieChartData: PropTypes.arrayOf(
      PropTypes.shape({
        x: PropTypes.string,
        y: PropTypes.number
      })
    ).isRequired,
    tableData: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        data: PropTypes.number,
        unit: PropTypes.string
      })
    ).isRequired,
    numberCardData: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        nationality: PropTypes.string,
        sex: PropTypes.string
      })
    ).isRequired
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
      lineChartData,
      pieChartData,
      tableData,
      numberCardData
    } = this.props;

    if (
      !lineChartData.length ||
      !pieChartData.length ||
      !tableData.length ||
      !numberCardData.length
    ) {
      return null;
    }

    const { muiFjTheme } = this.context;

    const styles = ReportPage.getStyles(this.context);

    const theme = FjVictoryTheme.getTheme(
      muiFjTheme.palette.primary1Color,
      muiFjTheme.palette.accent1Color
    );

    const numberCard = numberCardData.map((x, i) => (
      <BasicCard
        key={`${x.title}-${i}`}
        headerTitle={x.title}
        headerStyle={styles.header}
        headerTitleStyle={styles.headerTitle}
        contentStyle={styles.numberCard}
        className="dashboard-card"
        style={styles.card}
      >
        {x.data}
        <div style={styles.numberUnit}>{x.unit}</div>
      </BasicCard>
    ));

    return (
      <VerticalLayout style={styles.verticalLayout}>
        <div>
          <div style={styles.title}> Analytics Dashboard </div>
          <div style={styles.subtitle}> Project Digital Transformation </div>
        </div>
        <ItemsWrapperResponsive
          maxCols={4}
          gutterSize={0}
          style={{ width: "100%" }}
        >
          {numberCard}
        </ItemsWrapperResponsive>
        <BasicCard
          headerTitle={"App Traffic"}
          headerStyle={styles.header}
          headerTitleStyle={styles.headerTitle}
          style={styles.card}
          contentStyle={styles.cardContent}
          className="dashboard-card"
        >
          <LineChart graphsData={lineChartData} theme={theme} />
        </BasicCard>
        <ItemsWrapperResponsive
          maxCols={3}
          gutterSize={0}
          style={{ width: "100%" }}
        >
          <BasicCard
            headerTitle={"OS"}
            headerStyle={styles.header}
            headerTitleStyle={styles.headerTitle}
            style={styles.card}
            contentStyle={styles.cardPieContent}
            className="dashboard-card"
          >
            <PieChart002
              height={450}
              width={450}
              graphsData={pieChartData}
              theme={theme}
            />
          </BasicCard>
          <BasicCard
            headerTitle={"Browser"}
            headerStyle={styles.header}
            headerTitleStyle={styles.headerTitle}
            style={styles.card}
            contentStyle={styles.cardPieContent}
            className="dashboard-card"
          >
            <PieChart002
              height={450}
              width={450}
              graphsData={pieChartData}
              theme={theme}
            />
          </BasicCard>
          <BasicCard
            headerTitle={"Device"}
            headerStyle={styles.header}
            headerTitleStyle={styles.headerTitle}
            style={styles.card}
            contentStyle={styles.cardPieContent}
            className="dashboard-card"
          >
            <PieChart002
              height={450}
              width={450}
              graphsData={pieChartData}
              theme={theme}
            />
          </BasicCard>
        </ItemsWrapperResponsive>
        <BasicCard
          headerTitle={"Detail"}
          headerStyle={styles.header}
          headerTitleStyle={styles.headerTitle}
          style={styles.card}
          contentStyle={styles.cardTableContent}
          className="dashboard-card"
        >
          <div style={styles.tableWrapper}>
            <div style={styles.tableWrapperInner}>
              <Table002 reportData={tableData} />
            </div>
          </div>
        </BasicCard>
      </VerticalLayout>
    );
  }
}
