import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { form_style_supply } from './../../../styles/CustomForm'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

/**
 * filters out the display information based on criteria
 * @param {string} from_date - start date
 * @param {string} to_date - end date
 * @param {string} store - name of the store 
 * @param {string} item_name - name of the item

 */
const styles = theme => ({
  div: {
    display: 'block',
    padding: 20,
    width: '850px',
    overflow: 'hidden',
    backgroundColor: '#CCE5FF',
    color: 'black'
  },

  header: {
    display: 'block',
    padding: 20,
    width: '850px',
    overflow: 'hidden',
    backgroundColor: '#3f51b5',
    color: 'white'
  },

  text_input: {
    width: '250px',

    backgroundColor: 'white'

  },
  paperRight: {
    height: 600,
    flex: 4,
    margin: 10,
    textAlign: 'center',
  }
});




const SuppliesFilter = (props) => {
  const { classes } = props;

  return (

    <div className="picker">
      <Paper className={classes.header}>
        {props.title}
      </Paper>
      <Paper className={classes.div}>
        <form>
          <label>
            Date Range From &nbsp;&nbsp;
                    </label>
          <DatePicker
            dateFormat="MM/dd/yyyy"
            showYearDropdown
            showMonthDropdown
            selected={props.from_date}
            onChange={props.handleFromDate}
          />
          &nbsp;&nbsp;
         To
         &nbsp;&nbsp;
          <DatePicker
            dateFormat="MM/dd/yyyy"
            showYearDropdown
            showMonthDropdown
            selected={props.to_date}
            onChange={props.handleToDate}
          />
          <br />
          <FormControl variant="outlined" style={{ display: 'inline' }}>
            <InputLabel
              htmlFor="item_name"
              style={{ color: 'black' }}
            >
              Item Name
          </InputLabel>
            <TextField
              id="item_name"
              name="item_name"
              label="Item Name"
              margin="normal"
              variant="outlined"
              style={form_style_supply}
              onChange={props.itemValue}
              value={props.item_name}
            />
          </FormControl>
          <br />
          <FormControl variant="outlined" style={{ display: 'inline' }}>
            <InputLabel
              htmlFor="store"
              style={{ color: 'black' }}
            >
              Store
          </InputLabel>
            <TextField
              id="store"
              name="store"
              label="Store"
              margin="normal"
              variant="outlined"
              style={form_style_supply}
              onChange={props.storeValue}
              value={props.store}
            />
          </FormControl>
          <br />
          <Button variant="contained" color="primary" onClick={props.submitInfo}>
            Submit
                </Button>
        </form>
      </Paper>
    </div>

  )

}

export default withStyles(styles)(SuppliesFilter)