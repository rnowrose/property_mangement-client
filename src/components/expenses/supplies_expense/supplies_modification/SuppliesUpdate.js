import React, { Component } from "react";
import ExpenseForm from './../../ExpenseForm'
import SideBar from "../../SideBar";
import { styles } from './../../../styles/Layout'
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom'
import SnackBarSubmit from './../../../styles/SnackBarSubmit'
/**
 * Update Existing Supply Information from database
 */
class SupplyUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: '',
            description: '',
            store: '',
            item_name: '',
            PropData: [],
            message: '',
            open: false,
            variant: '',
            amount_error: false,
            store_error: false,
            description_error: false,
            item_name_err: false,
            toDisplay: false

        };

        this.amountValue = this.amountValue.bind(this);
        this.descValue = this.descValue.bind(this);
        this.storeValue = this.storeValue.bind(this);
        this.itemValue = this.itemValue.bind(this);
        this.updateLegExp = this.updateLegExp.bind(this);
        this.handleClose = this.handleClose.bind(this);


    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
    };

    itemValue = (event) => {
        this.setState({ item_name: event.target.value });
    };

    amountValue = (event) => {
        this.setState({ amount: event.target.value });
    };

    descValue = (event) => {
        this.setState({ description: event.target.value });
    };

    storeValue = (event) => {
        this.setState({ store: event.target.value });
    };

    componentDidMount() {
        const sup_id = parseInt(this.props.match.params.sup_id)

        fetch("http://localhost:4000/api/supply/" + sup_id)
            .then(response => response.json())
            .then(data => {
                this.setState({ amount: data.amount, item_name:data.item_name, description: data.description, store: data.store })
            }
            );


    }

    updateLegExp = (event) => {
        const sup_id = parseInt(this.props.match.params.sup_id)
        let num = /[0-9]/g;
        let amount = this.state.amount;
        let store = this.state.store;
        let description = this.state.description;
        let item_name = this.state.item_name

        this.setState({ open: true });

        if (amount === '' || store === '' || description === '' || item_name===''){
            this.setState({ message: 'Please Fill In All The Fields' });
            this.setState({ variant: 'error' });
            if (amount === '') {
                this.setState({ amount_error: true });
            }

            if (store === '') {
                this.setState({ store_error: true });
            }

            if (description === '') {
                this.setState({ description_error: true });
            }

            if (item_name === '') {
                this.setState({ item_name_err: true });
            }

        } else if (!amount.match(num)) {
            this.setState({ message: 'Invalid Amount Value' });
            this.setState({ variant: 'error' });
        } else {
            this.setState({ toDisplay: true });
            event.preventDefault();  
            window.location.replace("/supplies_expense");
            fetch("http://localhost:4000/api/supply/" + sup_id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body:
                    JSON.stringify({
                        amount: this.state.amount,
                        item_name: this.state.item_name,
                        description: this.state.description,
                        store: this.state.store,
                        exp_id: 2

                    })



            }).then(response => response.json())
        }



    };

    render() {
        const { classes } = this.props;
        if (this.state.toDisplay === true) {
            return <Redirect to='/supplies_expense' />
        }
        return (
            <div className={classes.div}>
                <Grid zDepth={3} style={styles.paperLeft}>

                    <SideBar />
                </Grid>
                <Grid zDepth={3} style={styles.paperRight}>

                    <ExpenseForm
                        amount={this.state.amount}
                        description={this.state.description}
                        store={this.state.store}
                        item_name={this.state.item_name}
                        amtValue={this.amountValue}
                        display="block"
                        desValue={this.descValue}
                        payValue={this.payValue}
                        enter={this.updateLegExp}
                        storeValue={this.storeValue}
                        itemValue={this.itemValue}
                        Styledisplay="none"
                        propisplay="none"
                        label="Update Supplies"
                        item_name_err={this.state.item_name_err}
                        amount_error={this.state.amount_error}
                        store_error={this.state.store_error}
                        description_error={this.state.description_error}

                    />
                    <SnackBarSubmit
                        open={this.state.open}
                        handleClose={this.handleClose}
                        variant={this.state.variant}
                        message={this.state.message}
                    />
                </Grid>

            </div>
        )




    }


}

export default withStyles(styles)(SupplyUpdate)