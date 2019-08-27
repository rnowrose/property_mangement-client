import React, { Component } from 'react';
import SideBar from '../../SideBar';
import ButtonLink from '../../../ButtonLink';
import AddIcon from '@material-ui/icons/Add';
import FinPayTable from './FinPayTable'
import { Table, TableBody } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { EnhancedTableHead, EnhancedTableToolbar, getSorting, stableSort, table_footer, table_style } from './../../../styles/CustomTable'
import TablePagination from '@material-ui/core/TablePagination';
import { styles } from './../../../styles/Layout'
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import {combineStyles} from './../../../styles/combineStyles'
import DateRange from '../../../reports/DateRange';
import Loading from './../../../Loading'

/**
 * Financial Payment Display
 * Shows the monthly payments based on the Specific Financial Expense
 */
const table_header = [
  { id: 'update', numeric: true, disablePadding: true, label: 'Update' },
  { id: 'amount', numeric: false, disablePadding: false, label: 'Amount' },
  { id: 'description', numeric: false, disablePadding: false, label: 'Description' },
  { id: 'payment_receipt', numeric: true, disablePadding: true, label: 'Payment Reciept' },
  { id: 'date_paid', numeric: true, disablePadding: false, label: 'Purchase Date' },


];

class FinExDisplay extends Component {
  constructor(props) {
    super(props);
    let d = new Date();
    this.state = {
      financial_payments: [],
      isLoading: false,
      order: 'asc',
      orderBy: 'amount',
      page: 0,
      rowsPerPage: 5,
      isOpen: [],
      start_date: new Date(d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear()),
      end_date: new Date()

    };
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

  handleClickOpen = (index) => {
    let isOpen = this.state.isOpen.slice();
    isOpen[index] = true;
    this.setState({ isOpen: isOpen });
  };

  handleClose = (index) => {
    let isOpen = this.state.isOpen.slice();
    isOpen[index] = false;
    this.setState({ isOpen: isOpen });
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

  componentDidMount() {
    let finex_id = parseInt(this.props.match.params.finex_id);

    this.setState({ isLoading: true });

    fetch("http://localhost:4000/api/financial_payments/" + finex_id + "?start_date=" + this.state.start_date + "&end_date=" + this.state.end_date)
      .then(response => response.json())
      .then(data => {
        this.setState({ financial_payments: data, isLoading: false })});
  }

  submitInfo() {
    let finex_id = parseInt(this.props.match.params.finex_id);

    this.setState({ isLoading: true });

    fetch("http://localhost:4000/api/financial_payments/" + finex_id + "?start_date=" + this.state.start_date + "&end_date=" + this.state.end_date)
      .then(response => response.json())
      .then(data => this.setState({ financial_payments: data, isLoading: false }));
  }

  render() {
    const { classes } = this.props;
    const { financial_payments, isLoading, order, orderBy, page, rowsPerPage } = this.state;
    let finex_id = parseInt(this.props.match.params.finex_id);

    if (isLoading) {
      return <Loading/>;
    }
    let button = (
      <ButtonLink href={'/add_finance_payment/' + finex_id}>
        <AddIcon />
        Add Financial Payment
       </ButtonLink>
    )
    return (
      <div className={classes.div}>
        <Grid zDepth={3} style={styles.paperLeft}>
          <SideBar />
        </Grid>
        <Grid zDepth={3} style={styles.paperRight}>
          <EnhancedTableToolbar addButton={button} />
        {financial_payments.length>0 ?
          <Paper>
            <Table className={classes.table}>
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={this.handleRequestSort}
                rows={table_header}
              />
              <TableBody>

                {stableSort(financial_payments, getSorting(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((financial_payments,i) => (
                    <FinPayTable
                      fin_id={financial_payments.fin_id}
                      amount={financial_payments.amount}
                      description={financial_payments.description}
                      payment_receipt={financial_payments.payment_receipt}
                      date_paid={financial_payments.date_paid}
                      finex_id={finex_id}
                      row={classes.row}
                      handleClickOpen={this.handleClickOpen.bind(this, i)}
                      open={this.state.isOpen[i] || false}
                      handleClose={this.handleClose.bind(this,i)}
                    />
                  )
                  )
                }
              </TableBody>
            </Table>
            <TablePagination
              style={table_footer}
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={financial_payments.length}
              rowsPerPage={rowsPerPage}
              page={page}
              backIconButtonProps={{
                'aria-label': 'Previous Page',
              }}
              nextIconButtonProps={{
                'aria-label': 'Next Page',
              }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </Paper>:"No Result Found"}
          &nbsp;
          <DateRange
                    from_date={this.state.start_date}
                    to_date={this.state.end_date}
                    handleFromDate={this.handleFromDate}
                    handleToDate={this.handleToDate}
                    submitInfo={this.submitInfo}
                    title="Enter Date Range for Financial Payment"
                />
        </Grid>
      </div>
    );
  }
}
const combinedStyles = combineStyles(table_style, styles)

export default withStyles(combinedStyles)(FinExDisplay);