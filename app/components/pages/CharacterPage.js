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

  

  render() {
    const {
      characterData
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
      characterData===null || !characterData.gears
    ) {
     return null;
    }
    else {
      console.log( "Character Data at Render: ");
      console.log( characterData );
    }

    return (
      <Paper>
      <Typography variant="Title" color="primary" align="center">Character Stats</Typography>
      <Typography variant="subheading" color="textSecondary" align="center">Echo of Stars</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Class</TableCell>
            <TableCell numeric>Level</TableCell>
            <TableCell numeric>Item Level</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {characterData.gears.map(n => {
            var k = n.lodestone_id + "_" + n.classjob_id;

            if( n.level < 70 ) {
              return
            }

            return (
              <TableRow key={k}>
                <TableCell component="th" scope="row">
                  {n.role.name}
                </TableCell>
                <TableCell numeric>{n.level}</TableCell>
                <TableCell numeric>{n.item_level_avg}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
    );
  }
}
