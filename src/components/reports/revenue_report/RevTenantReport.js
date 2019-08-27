import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import { Table, TableHead, TableRow, TableCell, TableBody, TableFooter } from '@material-ui/core';
import ReportSideMenu from '../ReportSideMenu';
import TablePagination from '@material-ui/core/TablePagination';
import { EnhancedTableHead, EnhancedTableToolbar, getSorting, stableSort,table_footer,table_style } from './../../styles/CustomTable'
import { styles } from './../../styles/Layout'
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import {combineStyles} from './../../styles/combineStyles'
import DateRange from '../DateRange';
import Loading from './../../Loading'
import Moment from 'react-moment';

/**
 * Revenue Information by Tenants
 */
const table_header = [
    { id: 'tenant_id', numeric: true, disablePadding: false, label: 'Account Number' },
    { id: 'first_name', numeric: false, disablePadding: false, label: 'Full Name' },
    { id: 'movein_date', numeric: true, disablePadding: false, label: 'Move-In Date' },
    { id: 'total_amount', numeric: true, disablePadding: false, label: 'Total Amount' },


];

function ccyFormat(num) {
    return `${num.toFixed(2)}`;
  }

  

class RevTenantReport extends Component {
    constructor(props) {
        super(props);
        let date = this.props.location.search
        let date_sp = date.split("&");
        let from_sp = date_sp[0].split('=');
        let to_sp = date_sp[1].split('=');

        this.state = {
            rev_tenant: [],
            isLoading: false,
            order: 'asc',
            orderBy: 'tenant_id',
            page: 0,
            rowsPerPage: 5,
            start_date: new Date(from_sp[1]),
            end_date: new Date(to_sp[1])
        };
        this.handleRequestSort = this.handleRequestSort.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
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

    componentDidMount() {
        this.setState({ isLoading: true });    
        let prop_id = parseInt(this.props.match.params.prop_id);
        fetch("http://localhost:4000/api/tenant_rent_report/" + prop_id + "?start_date=" + this.state.start_date + "&end_date=" + this.state.end_date)
            .then(response => response.json())
            .then(data => this.setState({ rev_tenant: data[0], isLoading: false }));
    }

    submitInfo() {
        this.setState({ isLoading: true });
        let prop_id = parseInt(this.props.match.params.prop_id);
        fetch("http://localhost:4000/api/tenant_rent_report/" + prop_id + "?start_date=" + this.state.start_date + "&end_date=" + this.state.end_date)
            .then(response => response.json())
            .then(data => this.setState({ rev_tenant: data[0], isLoading: false }));
    }

    render() {
        const { rev_tenant, isLoading, order, orderBy, page, rowsPerPage } = this.state;
        if (isLoading) {
            return <Loading/>;
          }

        let sum = 0;
        rev_tenant.map(tenants => (sum += parseInt(tenants.total_amount)));
        const { classes } = this.props;

        return (
          <div className={classes.div}>
            <Grid style={styles.paperLeft}>
    
              <ReportSideMenu />
            </Grid>
            <Grid style={styles.paperRight}>
    
            { rev_tenant.length > 0 ?   <Paper>
                    <Table >
                    <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rows={table_header}
                        />
                        <TableBody>
                            {stableSort(rev_tenant, getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((tenants,i) => (
                                    <TableRow key={i} className={classes.row}>
                                        <TableCell align='center'>{tenants.tenant_id}</TableCell>
                                        <TableCell align='center'>{tenants.name}</TableCell>
                                        <TableCell align="center"><Moment format="MM/DD/YYYY hh:mm A">{new Date(tenants.movein_date)}</Moment></TableCell>

                                        <TableCell align='center'>${parseInt((tenants.total_amount)).toLocaleString()}</TableCell>

                                    </TableRow>

                                )
                                )
                            }

                        </TableBody>
                        <TableBody>
                        <TableRow className={classes.row}>

                            <TableCell align='right' colSpan={3}>Total: </TableCell>
                            <TableCell align='center'>${parseInt((ccyFormat(sum))).toLocaleString()}</TableCell>
                        </TableRow>
                        </TableBody>
                    </Table>
                    <TablePagination
                                    style={table_footer}

                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rev_tenant.length}
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
                </Paper> : "No Result Found "}
              
                                &nbsp;
            
                                <DateRange
                    from_date={this.state.start_date}
                    to_date={this.state.end_date}
                    handleFromDate={this.handleFromDate}
                    handleToDate={this.handleToDate}
                    submitInfo={this.submitInfo}
                    title="Enter Date Range for Rent Amount"

                />
                </Grid>

            </div>
        )
    }
}
const combinedStyles = combineStyles(table_style, styles)

export default withStyles(combinedStyles)(RevTenantReport);