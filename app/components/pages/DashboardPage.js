import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import CharacterContainer from "../containers/CharacterContainer";
import CharacterListContainer from "../containers/CharacterListContainer";
import BlankContainer from "../containers/BlankContainer";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

class SimpleTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Gathering Classes" />
            <Tab label="Crafting Classes" />
            <Tab label="Battle Classes" />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer><CharacterListContainer roleIds={[16, 17, 18]}/></TabContainer>}
        {value === 1 && <TabContainer><CharacterListContainer roleIds={[8, 9, 10, 11, 12, 13, 14, 15]}/></TabContainer>}
        {value === 2 && <TabContainer><CharacterListContainer roleIds={[1, 2, 3, 4, 5, 6, 7, 26, 29, 31, 32, 33, 34, 35]}/></TabContainer>}
      </div>
    );
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTabs);