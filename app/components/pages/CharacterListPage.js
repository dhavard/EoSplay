import PropTypes from "prop-types";
import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

export default class CharacterListPage extends Component {
  static propTypes = {
    characterListData: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        gears: PropTypes.arrayOf(
          PropTypes.shape({
            lodestone_id: PropTypes.number,
            classjob_id: PropTypes.any,
            level: PropTypes.number,
            role: PropTypes.shape({
              name: PropTypes.string,
              icon: PropTypes.string
            }),
            item_level_avg: PropTypes.number
          })
        )
      })
    )
  };

  static defaultProps = {};

  

  render() {
    const {
      characterListData
    } = this.props;

    const styles = theme => ({
      root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
      },
      table: {
        minWidth: 700,
      },
    });

    if (
      !characterListData.length
    ) {
     return null;
    }
    else {
      console.log( "Character List Data at Render: ");
      console.log( characterListData );
    }

    return (
      <Paper>
      <Typography variant="title" color="primary" align="center">Character Stats</Typography>
      <Typography variant="subheading" color="textSecondary" align="center">Echo of Stars</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            {characterListData[0].gears.map( n => {
              var k = "header_" + n.classjob_id;
              return (
                <TableCell numeric key={k}>{n.role.name}</TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {characterListData.map(n => {
            var k = "character_" + n.lodestone_id;

            return (
              <TableRow key={k}>
                <TableCell component="th" scope="row">
                  {n.name}
                </TableCell>
                {n.gears.map( g => { 
                  var j = "gear_" + n.lodestone_id + "_" + g.classjob_id;
                  if( g.level < 70 ) {
                    return (<TableCell key={j}></TableCell>);                  
                  } else {
                    if (!g.item_level_avg)  {
                      return (<TableCell key={j}><div>{g.level}</div></TableCell>);  
                    } else {
                      return (<TableCell key={j}><div>{g.level}</div><div>({g.item_level_avg})</div></TableCell>);  
                    }
                  }
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
    );
  }
}
