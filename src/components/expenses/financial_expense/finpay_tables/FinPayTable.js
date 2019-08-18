import React, { Component } from 'react';
import { TableRow, TableCell, TableBody,Button } from '@material-ui/core';
import { Link } from 'react-router-dom'
import UpdateIcon from '@material-ui/icons/Update';
import PaymentReceiptDialog from './../../PaymentRecieptDialog'
import Moment from 'react-moment';

/**
 * 
 * @param {string} amount - amount paid for all expenses
 * @param {string} description  - why the expense occured
 * @param {string} payment_receipt  - click on pop up to display image
 */

const FinPayTable = (props) => {
    return (
        <TableRow key={props.fin_id} className={props.row}>
            <TableCell align='center'><Link to={"/update_finance_payment/" + props.finex_id + "/" + props.fin_id}><UpdateIcon /></Link></TableCell>
            <TableCell align='center'>${parseInt((props.amount)).toLocaleString()}</TableCell>
            <TableCell align="center">{props.description}</TableCell>
            <TableCell align="center">{props.payment_receipt!=null ? <Button variant="contained"  color="primary" onClick={props.handleClickOpen}>
                View Image
             </Button>: "No Receipt"}
             <PaymentReceiptDialog
                    open={props.open}
                    handleClose={props.handleClose}
                    payment_receipt={props.payment_receipt}

                />
             </TableCell>
            <TableCell align="center"><Moment format="MM/DD/YYYY hh:mm A">{new Date(props.date_paid)}</Moment></TableCell>

        </TableRow>
    )

}

export default FinPayTable