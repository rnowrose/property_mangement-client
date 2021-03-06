import React, { Component } from 'react';
import SideBar from '../../SideBar';
import ButtonLink from '../../../ButtonLink';
import AddIcon from '@material-ui/icons/Add';
import LagalTable from './LegalTable'
import { Table,TableBody } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import { EnhancedTableHead, EnhancedTableToolbar, getSorting, stableSort, table_footer,table_style} from './../../../styles/CustomTable'
import { styles } from './../../../styles/Layout'
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import {combineStyles} from './../../../styles/combineStyles'
import DateRange from '../../../reports/DateRange';
import Loading from './../../../Loading'


/**
 * Include the overall Table of Legal Expense information
 */

 const table_header = [
  { id: 'update', numeric: true, disablePadding: true, label: 'Update' },
  { id: 'amount', numeric: false, disablePadding: false, label: 'Amount' },
  { id: 'description', numeric: false, disablePadding: false, label: 'Description' },
  { id: 'payment_receipt', numeric: true, disablePadding: true, label: 'Payment Reciept' },
  { id: 'date_paid', numeric: true, disablePadding: false, label: 'Purchase Date' },


];

class LegalDisplay extends Component {
  constructor(props) {
    super(props);
    let d = new Date();
    this.state = {
      legal: [],
      isLoading: false,
      order: 'asc',
      orderBy: 'amount',
      page: 0,
      rowsPerPage: 5,
      open: false,
      isOpen: [],
      openRowIndex: 0,
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
    this.setState({ isLoading: true });
   
   
    fetch("http://localhost:4000/api/legal_expenses?start_date=" + this.state.start_date + "&end_date=" + this.state.end_date)
      .then(response => response.json())
      .then(data => {
        this.setState({ legal: data, isLoading: false })
      
      });

    
      
  }

  submitInfo() {
    this.setState({ isLoading: true });
   
   
    fetch("http://localhost:4000/api/legal_expenses?start_date=" + this.state.start_date + "&end_date=" + this.state.end_date)
      .then(response => response.json())
      .then(data => {
        this.setState({ legal: data, isLoading: false })
      
      });

    
      
  }



  render() {
    const { classes } = this.props;
    const { legal, isLoading, order, orderBy, page, rowsPerPage } = this.state;
    if (isLoading) {
      return <Loading/>;
    }

    let button = (
      <ButtonLink href='/add_legal_expense'>
        <AddIcon />
        Add Legal Expense
      </ButtonLink>
    )
  
    return (
      <div className={classes.div}>
        <Grid zDepth={3} style={styles.paperLeft}>

          <SideBar />
        </Grid>
        <Grid zDepth={3} style={styles.paperRight}>

          <EnhancedTableToolbar addButton={button} />

        {legal.length>0?  <Paper>
            <Table className={classes.table}>
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={this.handleRequestSort}
                rows={table_header}
              />
              <TableBody>
                
              {stableSort(legal, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((legal,i) => (
                  <LagalTable
                    legexp_id={legal.legexp_id}
                    amount={legal.amount}
                    description={legal.description}
                    date_paid={legal.date_paid}
                    updateLE={"/update_legal_expense/" + legal.legexp_id}
                    row={classes.row}
                    handleClickOpen={this.handleClickOpen.bind(this, i)}
                    open={this.state.isOpen[i] || false}
                    payment_receipt={legal.payment_receipt}
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
              count={legal.length}
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

          </Paper>:"No Result Found" }
          &nbsp;
          <DateRange
                    from_date={this.state.start_date}
                    to_date={this.state.end_date}
                    handleFromDate={this.handleFromDate}
                    handleToDate={this.handleToDate}
                    submitInfo={this.submitInfo}
                    title="Enter Date Range for Legal Expense"
                />
         
          
        </Grid>

      </div>
    );
  }
}
const combinedStyles = combineStyles(table_style, styles)

export default withStyles(combinedStyles)(LegalDisplay);


