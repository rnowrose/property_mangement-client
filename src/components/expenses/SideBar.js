import React, { Component } from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BuildIcon from '@material-ui/icons/Build';
import PaymentIcon from '@material-ui/icons/Payment';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';

/**
 * Side Bar for Expenses
 * @method ListItemLink - used for clicking to specific page
 */

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

export default class SideBar extends Component {

    render() {
        return (
            <div>
                <ListItemLink href="/supplies_expense">
                    <ListItemIcon>
                        <BuildIcon />
                    </ListItemIcon>
                    <ListItemText primary="Supplies" />
                </ListItemLink>

                <ListItemLink href="/finance_expense">
                    <ListItemIcon>
                        <PaymentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Financial" />
                </ListItemLink>

                <ListItemLink href="/legal_expense">
                    <ListItemIcon>
                        <WorkOutlineIcon />
                    </ListItemIcon>
                    <ListItemText primary="Legal" />
                </ListItemLink>
            </div>
        );
    }
}