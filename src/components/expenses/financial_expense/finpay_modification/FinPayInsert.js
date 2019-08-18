import React, { Component } from "react";
import ExpenseForm from './../../ExpenseForm'
import SideBar from "../../SideBar";
import { styles } from './../../../styles/Layout'
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom'
import SnackBarSubmit from './../../../styles/SnackBarSubmit'

/**
 * Inserts Financial Payment Information into database
 * @method enterFinPay - enters the data into database
 */

class FinPayInsert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: '',
            description: '',
            payment_receipt: null,
            payment_receipt_Value: '',
            message: '',
            open: false,
            variant: '',
            amount_error: false,
            description_error: false,
            toDisplay: false


        };

        this.amountValue = this.amountValue.bind(this);
        this.descValue = this.descValue.bind(this);
        this.payValue = this.payValue.bind(this);
        this.enterFinPay = this.enterFinPay.bind(this);
        this.handleClose = this.handleClose.bind(this);


    }
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
    };

    amountValue = (event) => {
        this.setState({ amount: event.target.value });
    };

    descValue = (event) => {
        this.setState({ description: event.target.value });
    };

    payValue = (event) => {
        this.setState({ payment_receipt: event.target.files[0] });
        this.setState({ payment_receipt_Value: event.target.value });

    };

    enterFinPay = (event) => {
        let finex_id = parseInt(this.props.match.params.finex_id);
        let data = new FormData();
        data.append('payment_receipt', this.state.payment_receipt);

        let num = /[0-9]/g;
        let amount = this.state.amount;
        let description = this.state.description;
        this.setState({ open: true });
        if (amount === '' || description === ''){
            this.setState({ message: 'Please Fill In All The Fields' });
            this.setState({ variant: 'error' });
            if (amount === '') {
                this.setState({ amount_error: true });
            }

            if (description === '') {
                this.setState({ description_error: true });
            }

        } else if (!amount.match(num)) {
            this.setState({ message: 'Invalid Amount Value' });
            this.setState({ variant: 'error' });
        } else {
            this.setState({ toDisplay: true });
            event.preventDefault();  
            window.location.replace("/finance_payments/" + finex_id);
            fetch("/api/upload", {
                method: 'POST',
                body: data

            })

            fetch("/api/financial_payments", {
                method: 'POST',
                headers: {
                    'Accept': 'multipart/form-data,application/json, application/xml, text/plain, text/html, *.*',
                    'Content-Type': 'application/json'

                },
                body:
                    JSON.stringify({
                        amount: this.state.amount,
                        description: this.state.description,
                        payment_receipt: this.state.payment_receipt_Value,
                        finex_id: finex_id,

                    }),
            })

        }




        // .then(response => console.log(response.json()))


    };

    render() {
        const { classes } = this.props;
        if (this.state.toDisplay === true) {
            return <Redirect to='/legal_expense' />
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
                        payment_receipt={this.state.payment_receipt_Value}
                        amtValue={this.amountValue}
                        display="none"
                        desValue={this.descValue}
                        payValue={this.payValue}
                        enter={this.enterFinPay}
                        propisplay="none"
                        label="Add Financial Payment"
                        amount_error={this.state.amount_error}
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

export default withStyles(styles)(FinPayInsert)