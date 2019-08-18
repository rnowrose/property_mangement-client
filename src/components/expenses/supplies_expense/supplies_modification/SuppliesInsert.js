import React, { Component } from "react";
import ExpenseForm from './../../ExpenseForm'
import SideBar from "../../SideBar";
import { styles } from './../../../styles/Layout'
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import SnackBarSubmit from './../../../styles/SnackBarSubmit'
import { Redirect } from 'react-router-dom'

/**
 * Enter Supply Information into database
 */
class SuppliesInsert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: '',
            store: '',
            description: '',
            item_name: '',
            payment_receipt: null,
            payment_receipt_Value: '',
            properties: [],
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
        this.storeValue = this.storeValue.bind(this);
        this.descValue = this.descValue.bind(this);
        this.payValue = this.payValue.bind(this);
        this.itemValue = this.itemValue.bind(this);
        this.enterSup = this.enterSup.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);


    }
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
    };
    handleChange = event => {
        this.setState({ properties: event.target.value });

    };

    itemValue = (event) => {
        this.setState({ item_name: event.target.value });
    };

    amountValue = (event) => {
        this.setState({ amount: event.target.value });
    };

    storeValue = (event) => {
        this.setState({ store: event.target.value });
    };

    descValue = (event) => {
        this.setState({ description: event.target.value });
    };

    payValue = (event) => {
        this.setState({ payment_receipt: event.target.files[0] });
        this.setState({ payment_receipt_Value: event.target.value });
    };

    enterSup = (event) => {
        let data = new FormData();
        data.append('payment_receipt', this.state.payment_receipt);
        let num = /[0-9]/g;
        let amount = this.state.amount;
        let store = this.state.store;
        let description = this.state.description;
        let item_name = this.state.item_name
        this.setState({ open: true });

        if (amount === '' || store === '' || description === '' || item_name==='') {
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

            fetch("/api/upload", {
                method: 'POST',
                body: data

            })

            fetch("/api/supplies", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',

                },
                body:
                    JSON.stringify({
                        amount: this.state.amount,
                        store: this.state.store,
                        item_name: this.state.item_name,
                        description: this.state.description,
                        payment_receipt: this.state.payment_receipt_Value,
                        exp_id: 2
                    })


            })
                .then(res => res.json())
                .then(data => {
                    this.setState({ toDisplay: true });
                    event.preventDefault();  
                    window.location.replace("/supplies_expense");
                    let prop = JSON.stringify(data);
                    let propParse = JSON.parse(prop);
                    console.log(propParse.sup_id);
                    console.log(this.state.properties);
                    for (let i = 0; i < this.state.properties.length; i++) {
                        fetch("/api/supply/insert_prop", {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',

                            },
                            body:
                                JSON.stringify({
                                    prop_id: this.state.properties[i],
                                    sup_id: propParse.sup_id
                                })


                        })
                    }
                })
        }




    };
    render() {
        const { classes } = this.props;
        if (this.state.toDisplay === true) {
            return <Redirect to='/supplies_expense' />
        }
        return (
            <div className={classes.div}>

                <Grid style={styles.paperLeft}>

                    <SideBar />
                </Grid>
                <Grid style={styles.paperRight}>

                    <ExpenseForm
                        amount={this.state.amount}
                        store={this.state.store}
                        description={this.state.description}
                        item_name={this.state.item_name}
                        payment_receipt={this.state.payment_receipt_Value}
                        amtValue={this.amountValue}
                        storeValue={this.storeValue}
                        desValue={this.descValue}
                        payValue={this.payValue}
                        enter={this.enterSup}
                        properties={this.state.properties}
                        handleChange={this.handleChange}
                        itemValue={this.itemValue}
                        label="Add Supplies"
                        amount_error={this.state.amount_error}
                        item_name_err={this.state.item_name_err}
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

export default withStyles(styles)(SuppliesInsert)