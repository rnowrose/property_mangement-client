import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import { Table, TableRow, TableCell, TableBody } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { EnhancedTableHead, getSorting, stableSort, table_footer, table_style} from './../../../styles/CustomTable'
import TablePagination from '@material-ui/core/TablePagination';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Moment from 'react-moment';
import {capitalize, styles} from './../../../styles/Layout'
import {combineStyles} from './../../../styles/combineStyles'
import SideBar from '../../SideBar';
import { useStyles, text_header } from './../../../styles/CustomForm'
import Loading from './../../../Loading'
/**
 * displays specific supply information based on id. 
 * It also provides all the properties that the supplies are purchased for.
 */
const table_header = [
    { id: 'prop_id', numeric: true, disablePadding: false, label: 'Property ID' },
    { id: 'address', numeric: false, disablePadding: false, label: 'Address' },
    { id: 'city', numeric: false, disablePadding: false, label: 'City' },
    { id: 'state', numeric: false, disablePadding: false, label: 'State' },
    { id: 'zip_code', numeric: true, disablePadding: false, label: 'Zip Code' },
    { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
    { id: 'date_purchased', numeric: true, disablePadding: false, label: 'Purchase Date' },


];



class SupplyDisplay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            amount: '',
            description: '',
            store: '',
            item_name: '',
            date_purchased: '',
            sup_id: '',
            properties: [],
            order: 'asc',
            orderBy: 'prop_id',
            supply: [],
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
        const sup_id = parseInt(this.props.match.params.sup_id)
        this.setState({ isLoading: true });

        fetch("http://localhost:4000/api/supply/" + sup_id)
            .then(response => response.json())
            .then(data => {
                this.setState({ isLoading:false, sup_id: data.sup_id, amount: data.amount, item_name:data.item_name, description: data.description, store: data.store, properties: data.Properties, date_purchased:data.date_purchased})
            }
        );
    }

    render() {
        const { properties, order, orderBy, rowsPerPage, page, isLoading } = this.state;

        const { classes } = this.props;
        if (isLoading) {
            return <Loading/>;
        }
        return (
            <div className={classes.div}>

               <Grid style={styles.paperLeft}>
                <SideBar />
              </Grid>
               <Grid style={styles.paperRight}>
 
               <Grid >
               <Paper className={classes.header}>
               <Typography style={text_header} component="h3" variant="h6" color="primary">
               Supply Display
               </Typography>
               </Paper>
               <Paper className={classes.form_layout}>         
               <Typography component="p">
               Supply ID: {this.state.sup_id}
               </Typography>
               &nbsp;
               <Typography component="p">
               Item Name: {this.state.item_name}
               </Typography>
               &nbsp;
               <Typography component="p">
               Store: {this.state.store}
               </Typography>
               &nbsp;
               <Typography component="p">
               Description: {this.state.description}
               </Typography>
               &nbsp;
               <Typography component="p">
               Amount: ${parseInt((this.state.amount)).toLocaleString()}
               </Typography>
               &nbsp;
               <Typography component="p">
               Date Purchased: <Moment format="MM/DD/YYYY hh:mm A">{new Date(this.state.date_purchased)}</Moment>
               </Typography>
                   </Paper> 
                </Grid>
                &nbsp;
               <Grid >
                { properties.length > 0 ? <Paper >
                  <Table className={classes.table}>
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rows={table_header}
                        />
                        <TableBody >
                            {stableSort(properties, getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((properties,i) => (
                                    <TableRow key={i} className={classes.row}>
                                        <TableCell align='center'>{properties.prop_id}</TableCell>
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


                        </TableBody>

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
                </Paper>:"" }
                </Grid>
                </Grid>

            </div>
        )
    }
}
const combinedStyles = combineStyles(table_style, styles, useStyles)

export default withStyles(combinedStyles)(SupplyDisplay)