import React, { Component } from 'react';
import { TableRow, TableCell, TableBody } from '@material-ui/core';
import { Link } from 'react-router-dom'
import UpdateIcon from '@material-ui/icons/Update';
import Moment from 'react-moment';
/**
 * table display of the financial expense information
 * @param {string} amount - amount paid for all expenses
 * @param {string} description  - why the expense occured
 * @param {string} payment_taken  - date of payment happening

 */
const FinExTable = (props) => {
    return (
        <TableRow key={props.finex_id} className={props.row}>
            <TableCell align='center'><Link to={'/update_finance_expense/' + props.finex_id}><UpdateIcon /></Link></TableCell>
            <TableCell align='center'><Link to={'/finance_payments/' + props.finex_id+ '?start_date=' + props.start_date + '&end_date=' + props.end_date}>View Payments</Link></TableCell>

            <TableCell align='center'>${parseInt((props.amount)).toLocaleString()}</TableCell>
            <TableCell align="center">{props.description}</TableCell>
            <TableCell align="center"><Moment format="MM/DD/YYYY hh:mm A">{new Date(props.payment_taken)}</Moment></TableCell>

        </TableRow>
    )

}

export default FinExTable