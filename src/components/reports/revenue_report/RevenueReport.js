import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import { Table, TableHead, TableRow, TableCell, TableBody, TableFooter } from '@material-ui/core';
import ReportSideMenu from '../ReportSideMenu';
import { Link } from 'react-router-dom'
import TablePagination from '@material-ui/core/TablePagination';
import { EnhancedTableHead, getSorting, stableSort,table_footer,table_style } from './../../styles/CustomTable'
import { styles } from './../../styles/Layout'
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import {combineStyles} from './../../styles/combineStyles'
import DateRange from '../DateRange';
import Loading from './../../Loading'

/**
 * Revenue Information by Properties
 */
const table_header = [
    { id: 'prop_id', numeric: true, disablePadding: false, label: 'Property ID' },
    { id: 'address', numeric: false, disablePadding: false, label: 'Address' },
    { id: 'city', numeric: false, disablePadding: false, label: 'City' },
    { id: 'date_purchased', numeric: true, disablePadding: false, label: 'Purchase Date' },
    { id: 'total_amount', numeric: true, disablePadding: false, label: 'Total Amount' },



];
function ccyFormat(num) {
    return `${num.toFixed(2)}`;
}


class RevenueReport extends Component {
    constructor(props) {
        super(props);
        let d = new Date();
        this.state = {
            rev_prop: [],
            isLoading: false,
            order: 'asc',
            orderBy: 'prop_id',
            page: 0,
            rowsPerPage: 5,
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
        fetch("/api/prop_rent_report?start_date=" + this.state.start_date + "&end_date=" + this.state.end_date)
            .then(response => response.json())
            .then(data => this.setState({ rev_prop: data[0], isLoading: false }));
    }

    submitInfo() {
        this.setState({ isLoading: true });
        fetch("/api/prop_rent_report?start_date=" + this.state.start_date + "&end_date=" + this.state.end_date)
            .then(response => response.json())
            .then(data => this.setState({ rev_prop: data[0], isLoading: false }));
    }

    render() {
        const { rev_prop, isLoading, order, orderBy, page, rowsPerPage } = this.state;
        let sum = 0;
        rev_prop.map(properties => (sum += parseInt(properties.total_amount)));
        if (isLoading) {
            return <Loading/>;
          }
        const { classes } = this.props;

        return (
          <div className={classes.div}>
            <Grid style={styles.paperLeft}>
    
              <ReportSideMenu />
            </Grid>
            <Grid style={styles.paperRight}>

            { rev_prop.length > 0 ?  <Paper>
                    <Table className={classes.table}>
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rows={table_header}
                        />
                        <TableBody>
                            {stableSort(rev_prop, getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((properties,i) => (
                                    <TableRow key={i} className={classes.row}>
                                        <TableCell align='center'><Link to={`/revenue_tenant_report/${properties.prop_id}?start_date=${this.state.start_date}&end_date=${this.state.end_date}`} key={properties.prop_id}>{properties.prop_id}</Link></TableCell>
                                        <TableCell align='center'>{properties.address}</TableCell>
                                        <TableCell align="center">{properties.city}</TableCell>
                                        <TableCell align="center">{properties.date_purchased}</TableCell>
                                        <TableCell align='center'>${parseInt((properties.total_amount)).toLocaleString()}</TableCell>
                                    </TableRow>

                                )
                                )
                            }

                        </TableBody>
                        <TableBody>
                            <TableRow className={classes.row}>
                                <TableCell align='right' colSpan={4}>Total: </TableCell>
                                <TableCell align='center'>${parseInt((ccyFormat(sum))).toLocaleString()}</TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                    <TablePagination
                    style={table_footer}
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rev_prop.length}
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

                </Paper> : "No Result Found"}
              
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

export default withStyles(combinedStyles)(RevenueReport)