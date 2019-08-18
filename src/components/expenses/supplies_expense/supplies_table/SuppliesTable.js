import React, { Component } from 'react';
import { TableRow, TableCell, Button } from '@material-ui/core';
import { Link } from 'react-router-dom'
import UpdateIcon from '@material-ui/icons/Update';
import PaymentReceiptDialog from './../../PaymentRecieptDialog'
import Moment from 'react-moment';
/**
 * displays all the supplies information
 * Represents a Expense Form. Used for all three types of expenses
 * @param {string} amount - amount paid for all expenses
 * @param {string} item_name - name of the item purchased
 * @param {string} store - name of the store where it was purchased
 * @param {string} description  - why the expense occured
 * @param {string} payment_receipt  - upload an image. will Display on display page and the url will go into database
*/
 
const SuppliesTable = (props) => {
    return (

        
            <TableRow key={props.sup_id} className={props.row}>
                <TableCell align='center'><Link to={props.updateSE}><UpdateIcon /></Link></TableCell>
                <TableCell align='center'><Link to={props.sup_display}>{props.sup_id}</Link></TableCell>
                <TableCell align='center'>${parseInt((props.amount)).toLocaleString()}</TableCell>
                <TableCell align="center">{props.store}</TableCell>
                <TableCell align="center">{props.item_name}</TableCell>
                <TableCell align="center">{props.description}</TableCell>
                <TableCell align="center">{props.payment_receipt!=null ? <Button variant="contained" color="primary" onClick={props.handleClickOpen}>
                View Image
                </Button>: "No Receipt" }
                {<PaymentReceiptDialog
                    container={this}
                    open={props.open}
                    handleClose={props.handleClose}
                    payment_receipt={props.payment_receipt} />}
            </TableCell>                
            <TableCell align="center"><Moment format="MM/DD/YYYY hh:mm A">{new Date(props.date_purchased)}</Moment></TableCell>

            </TableRow>
    )

}

export default SuppliesTable