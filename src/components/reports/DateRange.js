import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

/**
 * date range for all reports
 * @param {string} from_date - start date
 * @param {string} to_date - end date
 */

const styles = theme => ({
  div: {
    display: 'block',
    padding: 20,
    width: '100%',
    overflow: 'hidden',
    backgroundColor: '#CCE5FF',
    color: 'black'
  },

  header: {
    display: 'block',
    padding: 20,
    width: '100%',
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




const DateRange = (props) => {
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
          <Button variant="contained" color="primary" onClick={props.submitInfo}>
            Submit
                </Button>
        </form>
      </Paper>
    </div>

  )

}

export default withStyles(styles)(DateRange)