import React, { Component } from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import PaymentIcon from '@material-ui/icons/Payment';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';


/**
 * Menu for the Expense and Revenue Report
 * @function ListItemLink - provides to respective report pages
 */
function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

export default class ReportSideMenu extends Component {

    render() {
        return (
            <div>
                <ListItemLink href="/expense_report">
                    <ListItemIcon>
                       <PaymentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Expense" />
                </ListItemLink>

                <ListItemLink href="/revenue_prop_report">
                    <ListItemIcon>
                        <AttachMoneyIcon />
                    </ListItemIcon>
                    <ListItemText primary="Revenue" />
                </ListItemLink>
            </div>
        );
    }
}