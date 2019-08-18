import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { Link } from 'react-router-dom'
import UpdateIcon from '@material-ui/icons/Update';
import ButtonLink from '../ButtonLink';
import AddIcon from '@material-ui/icons/Add';
import { EnhancedTableHead, EnhancedTableToolbar, getSorting, stableSort, table_footer, table_style} from './../styles/CustomTable'
import TablePagination from '@material-ui/core/TablePagination';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Moment from 'react-moment';
import {capitalize} from './../styles/Layout'
import Loading from './../Loading'

/*** 
 * Display Property Information
 * @method table_header - scrollable table header
*/

const table_header = [
    { id: 'update', numeric: true, disablePadding: true, label: 'Update' },
    { id: 'prop_id', numeric: true, disablePadding: false, label: 'Property ID' },
    { id: 'address', numeric: false, disablePadding: false, label: 'Address' },
    { id: 'city', numeric: false, disablePadding: false, label: 'City' },
    { id: 'state', numeric: false, disablePadding: false, label: 'State' },
    { id: 'zip_code', numeric: true, disablePadding: false, label: 'Zip Code' },
    { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
    { id: 'date_purchased', numeric: true, disablePadding: false, label: 'Purchase Date' },


];



class PropTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            order: 'asc',
            orderBy: 'prop_id',
            properties: [],
            isLoading: false,
            page: 0,
            rowsPerPage: 5,
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

        fetch("/api/properties")
            .then(response => response.json())
            .then(data => this.setState({ properties: data, isLoading: false }));
    }

    render() {
        const { properties, isLoading, order, orderBy, rowsPerPage, page } = this.state;

        if (isLoading) {
            return <Loading/>;
        }

        let button = (
            <ButtonLink href='/add_property'>
                <AddIcon />
                Add Properties
            </ButtonLink>
        )
        const { classes } = this.props;

        return (
            <div>
               <Grid container className={classes.root}>

               <Grid >
                <EnhancedTableToolbar addButton={button} />
                { properties.length > 0 ? <Paper >
                  <Table className={classes.table}>
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rows={table_header}
                        />
                       { <TableBody >
                            {stableSort(properties, getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((properties,i) => (
                                    <TableRow key={i} className={classes.row}>
                                        <TableCell align='center'><Link to={`/update_property/${properties.prop_id}`} key={properties.prop_id}><UpdateIcon /></Link></TableCell>
                                        <TableCell align='center'><Link to={`/tenants/${properties.prop_id}`} key={properties.prop_id}>{properties.prop_id}</Link></TableCell>
                                        <TableCell align='center'>{properties.address}</TableCell>
                                        <TableCell align="center">{properties.city}</TableCell>
                                        <TableCell align="center">{properties.state}</TableCell>
                                        <TableCell align="center">{properties.zip_code}</TableCell>
                                        <TableCell align="center">{capitalize(properties.status)}</TableCell>
                                        <TableCell align="center"><Moment format="MM/DD/YYYY hh:mm A">{new Date(properties.date_purchased)}</Moment></TableCell>

                                    </TableRow>
                                )
                                )
                            }


                        </TableBody>}

                   </Table> 
                    <TablePagination
                        style={table_footer}
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={properties.length}
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
                </Grid>
                </Grid>

            </div>
        )
    }
}

export default withStyles(table_style)(PropTable)