import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import { form_style, useStyles, select,button_style,text_header } from './../styles/CustomForm'
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
/*** 
 * Represents a Property Form. Used to update or insert data into the database
 * @param {string} address - property address
 * @param {string} city - property city
 * @param {string} state - property state
 * @param {string} zip_code - property zip code
 * @param {string} *_error - all error names are declared based on their respected column names. Validate the information
 * @param {string} *Value - declared based on column names. Control the state of those variables above. 
 * @param {string} enterProp - updates or inserts data into database. After all information is entered, this will submit them.
*/

const PropForm = (props) => {
    let style = {
        margin: 8,
        left:"15%",
        display: props.display,
        width: "300px",

    };

    //let classes = useStyles();
    const { classes } = props;

    return (

        <div className={classes.root}>
            <Paper className={classes.header}> 
                <Typography style={text_header} component="h3" variant="h6" color="primary" >
                    {props.label}
                </Typography>
            </Paper>
            <Paper className={classes.form_layout}>

                <form >

                    <TextField
                        error={props.address_error}
                        id="address"
                        name="address"
                        label="Address"
                        margin="normal"
                        variant="outlined"
                        onChange={props.addressValue}
                        value={props.address}
                        style={form_style}

                    /><br />
                    <TextField
                        error={props.city_error}
                        id="city"
                        name="city"
                        label="City"
                        margin="normal"
                        variant="outlined"
                        onChange={props.cityValue}
                        value={props.city}

                        style={form_style}

                    /><br />
                    <TextField
                        error={props.state_error}
                        id="state"
                        name="state"
                        label="State"
                        margin="normal"
                        variant="outlined"
                        onChange={props.stateValue}
                        value={props.us_state}
                        style={form_style}


                    /><br />
                    <TextField
                        error={props.zipcode_error}
                        id="zip_code"
                        name="zip_code"
                        label="Zip Code"
                        margin="normal"
                        variant="outlined"
                        onChange={props.zipValue}
                        value={props.zip_code}
                        style={form_style}

                    /><br />
                    <FormControl variant="outlined" className={select.formControl} fullWidth>

                        <InputLabel
                            htmlFor="stat"
                            style={style}
                        >
                            Status
                    </InputLabel>
                        <Select
                            value={props.status}
                            onChange={props.statusValue}
                            name="status"
                            style={style}
                            input={
                                <OutlinedInput
                                    labelWidth={45}
                                    name="status"
                                    id="stat"
                                />
                            }
                        >
                            <MenuItem value="own">Own</MenuItem>
                            <MenuItem value="sold">Sold</MenuItem>

                        </Select>
                    </FormControl>

                    <br />
                    <Button  style={button_style} variant="contained" color="primary" onClick={props.enterProp}>
                        Submit
                </Button>
               
                </form>
            </Paper>
        </div>

    )

}

export default withStyles(useStyles)(PropForm);
