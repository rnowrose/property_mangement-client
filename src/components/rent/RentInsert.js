import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import RentDialog from './RentDialog'
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import { EnhancedTableHead, EnhancedTableToolbar, getSorting, stableSort,table_footer,table_style} from './../styles/CustomTable'
import TablePagination from '@material-ui/core/TablePagination';
import SnackBarSubmit from './../styles/SnackBarSubmit'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Moment from 'react-moment';
import Loading from './../Loading'

/**
 * Display Rent Information. 
 * @param {array} table_header- sort header
 * @param {function} handleClickOpen - open popup to enter the rent information
 */
const table_header = [
    { id: 'amount', numeric: true, disablePadding: false, label: 'Amount' },
    { id: 'date_paid', numeric: true, disablePadding: false, label: 'Date Paid' },
];
class RentInsert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            amount: '',
            order: 'asc',
            orderBy: 'amount',
            rents: [],
            isLoading: false,
            page: 0,
            rowsPerPage: 5,
            message: '',
            open_snackbar: false,
            variant: '',
            fname_error: false,
        };

        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.amountValue = this.amountValue.bind(this);
        this.enterValue = this.enterValue.bind(this);
        this.handleRequestSort = this.handleRequestSort.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
        this.handleCloseSnackBar = this.handleCloseSnackBar.bind(this);



    }
    amountValue = (event) => {
        this.setState({ amount: event.target.value });
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


    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };


    handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open_snackbar: false });
    };
    enterValue = (event) => {
        let prop_id = parseInt(this.props.match.params.prop_id);
        let tenant_id = parseInt(this.props.match.params.tenant_id);
        let num = /[0-9]/g;
        let amount = this.state.amount
        if(amount===''){
            this.setState({ message: 'Please Fill The Amount Field' });
            this.setState({ variant: 'error' });
            this.setState({ open_snackbar: true });

        }else if(!amount.match(num)){
            this.setState({ message: 'Field Must Be Numeric' });
            this.setState({ variant: 'error' });
            this.setState({ open_snackbar: true });
        }else{
            fetch("/api/rents", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
    
                },
                body:
                    JSON.stringify({
                        amount: this.state.amount,
                        prop_id: prop_id,
                        tenant_id: tenant_id
                    })
    
    
            })
            this.setState({ open: false });
            event.preventDefault();
            window.location.replace("/rents/" + tenant_id + "/" + prop_id);

        }

        
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        let tenant_id = parseInt(this.props.match.params.tenant_id);
        fetch("/api/tenant/" + tenant_id)
            .then(response => response.json())
            .then(data => {
                console.log(data.Rents);
                this.setState({ rents: data.Rents, isLoading: false });
            });
    }

    render() {
        const { rents, order, orderBy, page, rowsPerPage,isLoading } = this.state
        if (isLoading) {
            return <Loading/>;
        }
        let button = (
            <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                <AddIcon />
                Enter Rent Amount
             </Button>
        )

       

        const { classes } = this.props;

        return (
            <div>
                               <Grid container justify = "center" className={classes.root}>
                               <Grid container justify = "center" alignItems="center">

                <EnhancedTableToolbar addButton={button} />
                </Grid>

                <RentDialog
                    amountValue={this.amountValue}
                    amount={this.state.amount}
                    open={this.state.open}
                    handleClose={this.handleClose}
                    enterValue={this.enterValue}
                />
                  <SnackBarSubmit
                    open={this.state.open_snackbar}
                    handleClose={this.handleCloseSnackBar}
                    variant={this.state.variant}
                    message={this.state.message}
                />
                { rents.length > 0 ?  
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
                            {stableSort(rents, getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(rents => (
                                    <TableRow key={rents.rent_id} className={classes.row}>
                                        <TableCell align='center'>${parseInt((rents.amount)).toLocaleString()}</TableCell>
                                        <TableCell align="center"><Moment format="MM/DD/YYYY hh:mm A">{new Date(rents.date_paid)}</Moment></TableCell>
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
                        count={rents.length}
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
                </Paper> : "No Result Found " }
                </Grid>

            </div>
        )
    }
}

export default withStyles(table_style)(RentInsert)
