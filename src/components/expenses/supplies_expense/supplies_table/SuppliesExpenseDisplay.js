import React, { Component } from 'react';
import SideBar from '../../SideBar';
import ButtonLink from '../../../ButtonLink';
import AddIcon from '@material-ui/icons/Add';
import SuppliesTable from './SuppliesTable'
import Paper from '@material-ui/core/Paper';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { EnhancedTableHead, EnhancedTableToolbar, getSorting, stableSort, table_footer, table_style } from './../../../styles/CustomTable'
import TablePagination from '@material-ui/core/TablePagination';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './../../../styles/Layout'
import {combineStyles} from './../../../styles/combineStyles'
import SuppliesFilter from '../supplies_table/SuppliesFilter';
import Loading from './../../../Loading'

/**
 * Supplies Display including Filter and Table
 */

const table_header = [
  { id: 'update', numeric: true, disablePadding: true, label: 'Update' },
  { id: 'sup_id', numeric: true, disablePadding: false, label: 'Supplies ID' },
  { id: 'amount', numeric: false, disablePadding: false, label: 'Amount' },
  { id: 'store', numeric: false, disablePadding: false, label: 'Store' },
  { id: 'item_name', numeric: false, disablePadding: false, label: 'Item Name' },
  { id: 'description', numeric: false, disablePadding: false, label: 'Description' },
  { id: 'payment_receipt', numeric: true, disablePadding: true, label: 'Payment Reciept' },
  { id: 'date_purchased', numeric: true, disablePadding: false, label: 'Purchase Date' },


];

class SuppliesExpenseDisplay extends Component {
  constructor(props) {
    super(props);
    let d = new Date();

    this.state = {
      order: 'asc',
      orderBy: 'sup_id',
      supplies: [],
      isLoading: false,
      page: 0,
      rowsPerPage: 5,
      isOpen: [],
      item_name: '',
      store: '',
      start_date: new Date(d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear()),
      end_date: new Date()

    };

    this.handleRequestSort = this.handleRequestSort.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.handleFromDate = this.handleFromDate.bind(this);
    this.handleToDate = this.handleToDate.bind(this);
    this.submitInfo=this.submitInfo.bind(this);
    this.itemValue = this.itemValue.bind(this);
    this.storeValue = this.storeValue.bind(this);


  }
  handleFromDate = (date) => {
    this.setState({ start_date: date});
  };

  handleToDate = (date) => {
    this.setState({ end_date: date});
  };

  itemValue = (event) => {
    this.setState({ item_name: event.target.value });
  };

  storeValue = (event) => {
    this.setState({ store: event.target.value });
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
    this.setState({ isLoading: true });

    fetch("http://localhost:4000/api/supplies?start_date=" + this.state.start_date + "&end_date=" + this.state.end_date + "&store=" + this.state.store + "&item_name=" + this.state.item_name)
      .then(response => response.json())
      .then(data => this.setState({ supplies: data, isLoading: false }));
  }

  submitInfo() {
    this.setState({ isLoading: true });

    fetch("http://localhost:4000/api/supplies?start_date=" + this.state.start_date + "&end_date=" + this.state.end_date + "&store=" + this.state.store + "&item_name=" + this.state.item_name)
      .then(response => response.json())
      .then(data => this.setState({ supplies: data, isLoading: false }));
  }

  render() {
    const { supplies, isLoading, order, orderBy, page, rowsPerPage } = this.state;
    if (isLoading) {
      return <Loading/>;
    }
    let button = (
      <ButtonLink href='/add_supplies'>
        <AddIcon />
        Add Supplies
      </ButtonLink>
    )
    const { classes } = this.props;

    return (
      <div className={classes.div}>

        <Grid style={styles.paperLeft}>

          <SideBar />
        </Grid>
        <Grid style={styles.paperRight}>

          <EnhancedTableToolbar addButton={button} />
          {supplies.length > 0 ? 
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
                {stableSort(supplies, getSorting(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((supplies,i) => (
                    <SuppliesTable
                      sup_id={supplies.sup_id}
                      amount={supplies.amount}
                      store={supplies.store}
                      description={supplies.description}
                      payment_receipt={supplies.payment_receipt}
                      date_purchased={supplies.date_purchased}
                      item_name={supplies.item_name}
                      updateSE={"/update_supply_expense/" + supplies.sup_id}
                      row={classes.row}
                      handleClickOpen={this.handleClickOpen.bind(this, i)}
                      open={this.state.isOpen[i] || false}
                      handleClose={this.handleClose.bind(this,i)}
                      sup_display={"/supply_display/"  + supplies.sup_id}
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
              count={supplies.length}
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
          </Paper> : "No Result Found" }
          &nbsp;
          <SuppliesFilter
                    from_date={this.state.start_date}
                    to_date={this.state.end_date}
                    handleFromDate={this.handleFromDate}
                    handleToDate={this.handleToDate}
                    submitInfo={this.submitInfo}
                    itemValue={this.itemValue}
                    storeValue={this.storeValue}
                    store={this.state.store}
                    item_name={this.state.item_name}
                    title="Criteria"
                />
        </Grid>
      </div>
    );
  }
}

SuppliesExpenseDisplay.propTypes = {
  classes: PropTypes.object.isRequired,
};
const combinedStyles = combineStyles(table_style, styles)
export default withStyles(combinedStyles)(SuppliesExpenseDisplay);




