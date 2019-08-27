import React, { Component } from "react";
import TenantForm from './TenantForm'
import MenuItem from '@material-ui/core/MenuItem';
import SnackBarSubmit from './../styles/SnackBarSubmit'
import { Redirect } from 'react-router-dom'

/**
 * Add Tenant Information into database
 */

class TenantInsert extends Component {
    constructor(props){
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            phone_number: '',
            status: '',
            message: '',
            open: false,
            variant: '',
            fname_error: false,
            lname_error:false,
            email_error:false,
            pnum_error: false,
            toDisplay: false



        };

        this.fnameValue = this.fnameValue.bind(this);
        this.lnameValue = this.lnameValue.bind(this);
        this.pnumValue = this.pnumValue.bind(this);
        this.emailValue = this.emailValue.bind(this);
        this.enterTenant = this.enterTenant.bind(this);
        this.handleClose = this.handleClose.bind(this);


    }


    fnameValue = (event) => {
        this.setState({ first_name: event.target.value });
    };

    lnameValue = (event) => {
        this.setState({ last_name: event.target.value });
    };

    pnumValue = (event) => {
        this.setState({ phone_number: event.target.value });
    };

    emailValue = (event) => {
        this.setState({ email: event.target.value });
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({ open: false });
    };

    enterTenant = (event) => {
        let prop_id = parseInt(this.props.match.params.prop_id);
        let fname = this.state.first_name;
        let lname = this.state.last_name;
        let email = this.state.email;
        let pnum = this.state.phone_number;
        let alpha = /[a-zA-Z]/g;
        let email_format =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        let pnum_format = /^\([2-9]\d\d\)-[2-9]\d\d-\d{4}$/;
        this.setState({ open: true });
        if(fname==='' || lname==='' || email==='' || pnum===''){
                this.setState({ message: 'Please Fill In All The Fields' });
                this.setState({ variant: 'error' });
                if(fname === ''){
                    this.setState({ fname_error: true});
                }
    
                if(lname===''){
                    this.setState({ lname_error: true });
                }
    
                if(email===''){
                    this.setState({ email_error: true });
                }
                
                if(pnum===''){
                    this.setState({ pnum_error: true});
                }

        }else if(!pnum.match(pnum_format)){
            this.setState({ message: 'Must Be Formatted in (XXX)-XXX-XXXX' });
            this.setState({ variant: 'error' });
            this.setState({ pnum_error: true});
            
        }else if(!email.match(email_format)){
            this.setState({ message: 'Must Be Formatted in abc@google.com' });
            this.setState({ variant: 'error' });
            this.setState({ email_error: true });
            
        }else if((!fname.match(alpha) && !lname.match(alpha)) || 
                    !fname.match(alpha) || !lname.match(alpha)){
            this.setState({ message: 'Must Use Letters' });
            this.setState({ variant: 'error' });
            if(!fname.match(alpha)){
                this.setState({ fname_error: true});
            }

            if(!lname.match(alpha)){
                this.setState({ lname_error: true });
            }
        }else{
            this.setState({ toDisplay: true });
            event.preventDefault();  
            window.location.replace("/tenants/" + prop_id);
            fetch("http://localhost:4000/api/tenants", {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
    
                },
                body: 
                    JSON.stringify({
                        first_name: this.state.first_name,
                        last_name: this.state.last_name,
                        email: this.state.email,
                        phone_number: this.state.phone_number,
                        prop_id: prop_id
                    })
            
    
            })

        }

     
    };

    render() {
        let prop_id = parseInt(this.props.match.params.prop_id);

        if (this.state.toDisplay === true) {
            return <Redirect to={`/tenants/${prop_id}`} />
        }
        return(
            <div>
            <TenantForm
               first_name={this.state.first_name}
               last_name={this.state.last_name}
               email={this.state.email}
               phone_number={this.state.phone_number}
               fnameValue={this.fnameValue}
               lnameValue={this.lnameValue}
               emailValue={this.emailValue}
               pnumValue={this.pnumValue}
               enterTenant={this.enterTenant}
               statusValue={this.statusValue}
               status='active'
               display="none"
               label="Add Tenant"
               fname_error={this.state.fname_error}
               lname_error={this.state.lname_error}
               email_error={this.state.email_error}
               pnum_error={this.state.pnum_error}
             />
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
export default TenantInsert
