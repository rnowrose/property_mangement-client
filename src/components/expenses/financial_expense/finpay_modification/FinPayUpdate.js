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
 * @method updateFinPay - updates the data in database
 */

class FinExUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: '',
            description: '',
            message: '',
            open: false,
            variant: '',
            amount_error: false,
            description_error: false,
            toDisplay: false

        };

        this.amountValue = this.amountValue.bind(this);
        this.descValue = this.descValue.bind(this);
        this.updateFinPay = this.updateFinPay.bind(this);
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

    //dretrieve data to display on fields
    componentDidMount() {
        const fin_id = parseInt(this.props.match.params.fin_id)
        fetch("http://localhost:4000/api/financial_payment/" + fin_id)
            .then(response => response.json())
            .then(data => this.setState({ amount: data.amount, description: data.description })
            );


    }

    updateFinPay = (event) => {
        const finex_id = parseInt(this.props.match.params.finex_id)
        const fin_id = parseInt(this.props.match.params.fin_id)
        
        let num = /[0-9]/g;
        let amount = this.state.amount;
        let description = this.state.description;
        this.setState({ open: true });
        if  (amount === '' || description === '') {
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
            fetch("http://localhost:4000/api/financial_payment/" + fin_id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body:
                    JSON.stringify({
                        amount: this.state.amount,
                        description: this.state.description,
                        finex_id: finex_id,
                        fin_id: fin_id,
                        exp_id: 3
    
                    })
    
    
    
            }).then(response => response.json())
        }
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
                        amtValue={this.amountValue}
                        display="none"
                        desValue={this.descValue}
                        payValue={this.payValue}
                        enter={this.updateFinPay}
                        Styledisplay="none"
                        propisplay="none"
                        label="Update Financial Payment"
                        amount_error={this.state.amount_error}
                        description_error={this.state.description_error}
                    />
                </Grid>
                <SnackBarSubmit
                        open={this.state.open}
                        handleClose={this.handleClose}
                        variant={this.state.variant}
                        message={this.state.message}
                    />
            </div>
        )




    }


}

export default withStyles(styles)(FinExUpdate)