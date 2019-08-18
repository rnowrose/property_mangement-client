import React, { Component } from 'react';
import { TableRow, TableCell, TableBody } from '@material-ui/core';
import { Link } from 'react-router-dom'
import UpdateIcon from '@material-ui/icons/Update';
/**
 * table body of expense report
 * @param {string} type 
 * @param {string} amount 

 */

const ExpTableDisplay = (props) => {
    return (

        <TableRow className={props.row}>
            <TableCell align='center'>{props.type}</TableCell>
            <TableCell align="center">${parseInt((props.amount)).toLocaleString()}</TableCell>
        </TableRow>

    )

}

export default ExpTableDisplay