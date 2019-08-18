import React from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import { form_style, useStyles, select,button_style,text_header } from './../styles/CustomForm'

/**
 * Represents the form for entering tenant information. Used to Update and Insert Information 
 * @param {string} first_name - first name of tenant 
 * @param {string} last_name - name of tenant 
 * @param {string} email - name of tenant 
 * @param {string} phone_number - name of tenant 
 * @param {string} status - appears only in the update page. Change the status of the tenant 
 * @param {string} *_error - all error names are declared based on their respected column names. Validate the information
 * @param {string} *Value - declared based on column names. Control the state of those variables above. 
 * @param {function} enterTenant - updates or inserts data into database. After all information is entered, this will submit them.

 */

const TenantForm = (props) => {
    var style = {
        margin: 8,
        left:"15%",
        display: props.display,
        width: "300px",

    };
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
                    error={props.fname_error}
                    id="first_name"
                    name="first_name"
                    label="First Name"
                    margin="normal"
                    variant="outlined"
                    style={form_style}
                    onChange={props.fnameValue}
                    value={props.first_name}
                /><br />
                <TextField
                    error={props.lname_error}
                    id="last_name"
                    name="last_name"
                    label="Last Name"
                    margin="normal"
                    variant="outlined"
                    style={form_style}
                    onChange={props.lnameValue}
                    value={props.last_name}
                /><br />
                <TextField
                    error={props.email_error}
                    id="email"
                    name="email"
                    label="Email Address"
                    margin="normal"
                    variant="outlined"
                    style={form_style}
                    onChange={props.emailValue}
                    value={props.email}
                /><br />
                <TextField
                    error={props.pnum_error}
                    id="phone_number"
                    name="phone_number"
                    label="Phone Number"
                    margin="normal"
                    variant="outlined"
                    style={form_style}
                    onChange={props.pnumValue}
                    value={props.phone_number}
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
                                labelWidth="45"
                                name="status"
                                id="stat"
                            />
                        }
                    >
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="evicted">Evicted</MenuItem>
                        <MenuItem value="departed">Departed</MenuItem>
                    </Select>
                </FormControl>
                <br />
                <Button style={button_style} variant="contained" color="primary" onClick={props.enterTenant}>
                    Submit
                </Button>
            </form>
</Paper>
        </div>
    )

}

export default withStyles(useStyles)(TenantForm)