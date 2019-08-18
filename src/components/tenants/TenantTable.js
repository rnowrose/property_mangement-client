import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { Link } from 'react-router-dom'
import UpdateIcon from '@material-ui/icons/Update';
import ButtonLink from '../ButtonLink';
import AddIcon from '@material-ui/icons/Add';
import { EnhancedTableHead, EnhancedTableToolbar, getSorting, stableSort,table_footer,table_style} from './../styles/CustomTable'
import TablePagination from '@material-ui/core/TablePagination';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Moment from 'react-moment';
import {capitalize} from './../styles/Layout'
import Loading from './../Loading'
/*** 
 * Display Tenant Information
 * @method table_header - scrollable table header
*/
const table_header = [
    { id: 'update', numeric: true, disablePadding: true, label: 'Update' },
    { id: 'tenant_id', numeric: true, disablePadding: false, label: 'Account Number' },
    { id: 'first_name', numeric: false, disablePadding: false, label: 'First Name' },
    { id: 'last_name', numeric: false, disablePadding: false, label: 'Last Name' },
    { id: 'email', numeric: false, disablePadding: false, label: 'Email Address' },
    { id: 'phone_number', numeric: true, disablePadding: false, label: 'Phone Number' },
    { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
    { id: 'movein_date', numeric: true, disablePadding: false, label: 'Move-In Date' },


];


class TenantTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tenants: [],
            isLoading: false,
            order: 'asc',
            orderBy: 'amount',
            page: 0,
            rowsPerPage: 5
        };
        this.handleRequestSort = this.handleRequestSort.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    }

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
        fetch("/api/property/" + prop_id)
            .then(response => response.json())
            .then(data => {
                console.log(data.Tenants);
                this.setState({ tenants: data.Tenants, isLoading: false });
            });



    }
    render() {
        let prop_id = parseInt(this.props.match.params.prop_id);
        const { tenants, isLoading, order, orderBy, page, rowsPerPage } = this.state;

        let button = (
            <ButtonLink href={`/add_tenant/${prop_id}`}>
            <AddIcon />
            Add Tenants
            </ButtonLink>
        )

        if (isLoading) {
            return <Loading/>;
          }

        const { classes } = this.props;
        return (
            <div>
                               <Grid container className={classes.root}>

                               <Grid>

                <EnhancedTableToolbar addButton={button} />
             

                { tenants.length > 0 ? <Paper>
                <Table className={classes.table}>
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rows={table_header}
                        />
                        <TableBody>

                            {stableSort(tenants, getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(tenants => (
                                    <TableRow key={tenants.tenant_id} className={classes.row}>
                                        <TableCell align='center'><Link to={`/update_tenant/${prop_id}/${tenants.tenant_id}`} key={tenants.tenant_id}><UpdateIcon /></Link></TableCell>
                                        <TableCell align='center'><Link to={`/rents/${tenants.tenant_id}/${prop_id}`} key={tenants.tenant_id}>{tenants.tenant_id}</Link></TableCell>
                                        <TableCell align='center'>{tenants.first_name}</TableCell>
                                        <TableCell align="center">{tenants.last_name}</TableCell>
                                        <TableCell align="center">{tenants.email}</TableCell>
                                        <TableCell align="center">{tenants.phone_number}</TableCell>
                                        <TableCell align="center">{capitalize(tenants.status)}</TableCell>
                                        <TableCell align="center"><Moment format="MM/DD/YYYY hh:mm A">{new Date(tenants.movein_date)}</Moment></TableCell>

                                    </TableRow>
                                )
                                )
                            }

                        </TableBody>
                        </Table> 
                         <TablePagination
                        style={table_footer}
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={tenants.length}
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
                </Grid>
                </Grid>
            </div>
        )
    }
}

export default withStyles(table_style)(TenantTable)