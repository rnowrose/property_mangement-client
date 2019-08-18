import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

/**
 * used for table sorting
 * adjust table layout
 */

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = cmp(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
  }
  
  function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
  }


  let EnhancedTableToolbar = (props) => {
    const { numSelected, classes } = props;
  
    return (
      <Toolbar>
        <div>
          {props.addButton}
        </div>
        <div/>
      </Toolbar>
    );
  };

  class EnhancedTableHead extends React.Component {
    createSortHandler = property => event => {
      this.props.onRequestSort(event, property);
    };
  
    render() {
      const { order, orderBy,rows } = this.props;
  
      return (
        <TableHead>
          <TableRow>
            {rows.map(
              row => (
                <TableCell
                  key={row.id}
                  align='center'
                  padding={row.disablePadding ? 'none' : 'default'}
                  sortDirection={orderBy === row.id ? order : false}
                  style={table_header}
                >
                    <TableSortLabel
                      style={table_header}
                      active={orderBy === row.id}
                      direction={order}
                      onClick={this.createSortHandler(row.id)}
                    >
                      {row.label}
                    </TableSortLabel>
                </TableCell>
              ),
              this,
            )}
          </TableRow>
        </TableHead>
      );
    }
  }



  let table_header = {
    backgroundColor: '#3f51b5',
    color: 'white'
  
  
  }

  let table_footer = {
    backgroundColor: '#3f51b5',
    color: 'white'
    
  
  
  }

  const table_style = theme => ({
    root: {
      width: '100%',
      marginBottom: theme.spacing.unit * 3,
      overflowX: 'auto',
      paddingLeft: 40,
      position: 'relative',
    },
    table: {
      width: '800px',
    },

    report_table: {
      width: '100%',

    },

    row: {
      '&:nth-of-type(even)': {
        backgroundColor: '#CCE5FF',
        color: 'white'
      },
    },
  });

export {EnhancedTableHead, EnhancedTableToolbar, getSorting, stableSort, table_footer,table_style}

