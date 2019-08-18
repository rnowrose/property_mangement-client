import React, { Component } from "react";
import PropForm from './PropForm'
import SnackBarSubmit from './../styles/SnackBarSubmit'
import { Redirect } from 'react-router-dom'
/*** 
 * Modify Property Info from database
 * 
*/
class PropUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            city: '',
            us_state: '',
            zip_code: '',
            status: '',
            data: '',
            message: '',
            open: false,
            variant: '',
            address_error: false,
            city_error:false,
            state_error:false,
            zip_code_error: false,
            toDisplay: false

        };

        this.addressValue = this.addressValue.bind(this);
        this.cityValue = this.cityValue.bind(this);
        this.stateValue = this.stateValue.bind(this);
        this.zipValue = this.zipValue.bind(this);
        this.enterProp = this.enterProp.bind(this);
        this.statusValue = this.statusValue.bind(this);
        this.handleClose = this.handleClose.bind(this);

    }

    addressValue = (event) => {
        this.setState({
            address: event.target.value 
        });
    };

    cityValue = (event) => {
        this.setState({ city: event.target.value });
    };

    stateValue = (event) => {
        this.setState({ us_state: event.target.value });
    };

    zipValue = (event) => {
        this.setState({ zip_code: event.target.value });
    };


    statusValue = (event) => {
        this.setState({ status: event.target.value });
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({ open: false });
    };
    //retrieves data to display on fields
    componentDidMount(){
        const prop_id = parseInt(this.props.match.params.prop_id)
        fetch("/api/property/" + prop_id)
        .then(response => response.json())
        .then(data => this.setState({ address: data.address, city: data.city, us_state:data.state,
            zip_code:data.zip_code, status:data.status })      
        );

       
    }
    
    /**
     *  updates property infromation
     */
    enterProp = (event) => {
        const prop_id = parseInt(this.props.match.params.prop_id)
        let zipcodeformat = /^\d{5}$|^\d{5}-\d{4}$/;
        let alpha = /[a-zA-Z]/g;
        let address = this.state.address;
        let city = this.state.city;
        let us_state = this.state.us_state;
        let zip_code = this.state.zip_code;
        this.setState({ open: true });
        if(address === '' || city === '' || us_state === '' || zip_code===''){
            this.setState({ message: 'Please Fill In Following Field(s)' });
            this.setState({ variant: 'error' });
            if(address === ''){
                this.setState({ address_error: 'error' });
            }

            if(city===''){
                this.setState({ city_error: 'error' });
            }

            if(us_state===''){
                this.setState({ state_error: 'error' });
            }
            
            if(zip_code===''){
                this.setState({ zip_code_error: 'error' });
            }

        }else if(!zip_code.match(zipcodeformat)){
            this.setState({ message: 'Invalid Zipcode Format' });
            this.setState({ variant: 'error' });
            this.setState({ zip_code_error: true });

        }else if((!city.match(alpha) || !us_state.match(alpha)) || (!city.match(alpha) && !us_state.match(alpha))){
            this.setState({ message: 'Value Must be Letters Only' });
            this.setState({ variant: true });
            if(!city.match(alpha)){
                this.setState({ city_error: true });
            }

            if(!us_state.match(alpha)){
                this.setState({ state_error: 'error' });
            }
        }else{
            this.setState({ toDisplay: true });
            event.preventDefault();  
            window.location.replace("/");
            fetch("/api/property/" + prop_id, {
                method:'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',   
                },
                body: 
                    JSON.stringify({
                    address: this.state.address,
                    city: this.state.city,
                    state: (this.state.us_state).toUpperCase(),
                    zip_code: this.state.zip_code,
                    status: this.state.status
                    })

            
    
            }).then(response => response.json())


        }

    };

    render() {
        if (this.state.toDisplay === true) {
            return (
                <Redirect to='/' /> 
            )
        }
        

        
        return (
            <div>
            <PropForm
               address={this.state.address}
               city={this.state.city}
               us_state={this.state.us_state}
               zip_code={this.state.zip_code}
               status={this.state.status}
               addressValue={this.addressValue}
               cityValue={this.cityValue}
               stateValue={this.stateValue}
               zipValue={this.zipValue}
               statusValue={this.statusValue}
               enterProp={this.enterProp}
               display="inline"
               label="Update Property"
               address_error={this.state.address_error}
               city_error={this.state.city_error}
               state_error={this.state.state_error}
               zipcode_error={this.state.zip_code_error}
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

export default PropUpdate