import React, { Component } from 'react';
import ReportSideMenu from '../ReportSideMenu';
import ExpTabs from './ExpTabs'
import ExpTableDisplay from './ExpTableDisplay'
import Paper from '@material-ui/core/Paper';
import { Table, TableCell, TableRow, TableBody } from '@material-ui/core';
import { EnhancedTableHead, EnhancedTableToolbar, getSorting, stableSort, table_style } from './../../styles/CustomTable'
import TablePagination from '@material-ui/core/TablePagination';
import { styles } from './../../styles/Layout'
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { combineStyles } from './../../styles/combineStyles'
import {capitalize} from './../../styles/Layout'
import Loading from './../../Loading'


/**
 * Provides all data to Bar Graph, Pie Chart and also table
 */

const table_header = [
  { id: 'type', numeric: false, disablePadding: false, label: 'Type' },
  { id: 'total_amount', numeric: true, disablePadding: false, label: 'Amount' },



];

//format all the numbers 
function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}
class ExpenseReport extends Component {
  constructor(props) {
    super(props);
    let d = new Date();

    this.state = {
      exp: [],
      exp_data: [],
      value: 0,
      order: 'asc',
      orderBy: 'type',
      start_date: new Date(d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear()),
      end_date: new Date(),
      isLoading: false,

    };

    this.handleChange = this.handleChange.bind(this);
    this.handleRequestSort = this.handleRequestSort.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.handleFromDate = this.handleFromDate.bind(this);
    this.handleToDate = this.handleToDate.bind(this);
    this.submitInfo=this.submitInfo.bind(this);
  }
  handleFromDate = (date) => {
    this.setState({ start_date: date});
  };

  handleToDate = (date) => {
    this.setState({ end_date: date});
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  componentDidMount(){
    this.setState({ isLoading: true });
    const expense_data = [];
    expense_data.push(['Type', 'Total Amount'])
    fetch("http://localhost:4000/api/expense_report?start_date=" + this.state.start_date + "&end_date=" + this.state.end_date)
      .then(response => response.json())
      .then(data => {
        for (let i = 0; i < data[0].length; i++) {
          expense_data.push([capitalize(data[0][i].type), parseInt(data[0][i].total_amount)])
        }
        this.setState({ exp: expense_data });
        this.setState({ exp_data: data[0] });
        this.setState({ isLoading: false });



      });
  }

  submitInfo() {
    this.setState({ isLoading: true });
    const expense_data = [];
    expense_data.push(['Type', 'Total Amount'])
    fetch("http://localhost:4000/api/expense_report?start_date=" + this.state.start_date + "&end_date=" + this.state.end_date)
      .then(response => response.json())
      .then(data => {
        for (let i = 0; i < data[0].length; i++) {
          expense_data.push([capitalize(data[0][i].type), parseInt(data[0][i].total_amount)])
        }
        this.setState({ exp: expense_data });
        this.setState({ exp_data: data[0] });
        this.setState({ isLoading: false });




      });
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { exp, value, exp_data, order, orderBy,isLoading } = this.state;
    let sum = 0;
    const { classes } = this.props;
    if (isLoading) {
      return <Loading/>;
    }
    exp_data.map(expense => (sum += parseInt(expense.total_amount)));
    let exp_table_display =
      stableSort(exp_data, getSorting(order, orderBy))
        .map((exp,i) =>
          <ExpTableDisplay
            key={i} 
            type={capitalize(exp.type)}
            amount={exp.total_amount}
            row={classes.row}
          />
        )

    let data = (
      <Paper style={{width:'500px'}}>
        <Table className={classes.report_table}>
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onSelectAllClick={this.handleSelectAllClick}
            onRequestSort={this.handleRequestSort}
            rows={table_header}
          />
          <TableBody>

            {exp_table_display}
          </TableBody>
          <TableRow>

            <TableCell align='right'>Total:</TableCell>
            <TableCell align="center">${parseInt((ccyFormat(sum))).toLocaleString()}</TableCell>
          </TableRow>
        </Table>
      </Paper>

    )

    return (
      <div className={classes.div}>
        <Grid style={styles.paperLeft}>

          <ReportSideMenu />
        </Grid>
        <Grid style={styles.paperRight}>
          <ExpTabs
            value={value}
            handleChange={this.handleChange}
            pie_exp={exp}
            bar_exp={exp}
            table={data}
            from_date={this.state.start_date}
            to_date={this.state.end_date}
            handleFromDate={this.handleFromDate}
            handleToDate={this.handleToDate}
            submitInfo={this.submitInfo}
    />
        </Grid>

      </div>
    )
  }
}
const combinedStyles = combineStyles(table_style, styles)

export default withStyles(combinedStyles)(ExpenseReport)