import React from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropertiesSelect from './PropertiesSelect'
import { withStyles } from '@material-ui/core/styles';
import { form_style, useStyles, select,button_style,text_header } from './../styles/CustomForm'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
/*** 
 * Represents a Expense Form. Used for all three types of expenses
 * @param {string} amount - amount paid for all expenses
 * @param {string} item_name - name of the item purchased(only used in supplies)
 * @param {string} store - name of the store where it was purchased(only used in supplies)
 * @param {string} description  - why the expense occured
 * @param {array} properties  - identify which properties that the supplies were bought for
 * @param {file} payment_receipt  - upload an image. will Display on display page and the url will go into database
 * @param {string} *_error  - all error names are declared based on their respected column names. Validate the information
 * @param {string} *Value  - declared based on column names. Control the state of those variables above. 
 * @param {string} enter  - updates or inserts data into database. After all information is entered, this will submit them to the database.
*/
const ExpenseForm = (props) => {
    var style = {
        margin: 8,
        left:"15%",
        width: "300px",
        display: props.Styledisplay
      };

      var input_style = {
        margin: 8,
        left:"22%",
        width: "300px",
        display: props.propisplay
      };

      var StoreStyle = {
        margin: 8,
        display: props.display,
        left:"22%",
        width: "300px",
      };
      var hiddenStyle = {
        display: props.display,
       
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

            <form encType="multipart/form-data">
                <TextField
                    error={props.amount_error}
                    id="amount"
                    name="amount"
                    label="Amount"
                    margin="normal"
                    variant="outlined"
                    style={form_style}
                    onChange={props.amtValue}
                    value={props.amount}
                /><br/>
                <div style={StoreStyle}>
                <TextField
                    error={props.item_name_err}
                    id="item_name"
                    name="item_name"
                    label="Item Name"
                    margin="normal"
                    variant="outlined"
                    style={StoreStyle}
                    onChange={props.itemValue}
                    value={props.item_name}
                /><br/>
                <TextField
                    error={props.store_error}
                    id="store"
                    name="store"
                    label="Store"
                    margin="normal"
                    variant="outlined"
                    style={StoreStyle}
                    onChange={props.storeValue}
                    value={props.store}
                /><br/>
                </div>
                <TextField
                    error={props.description_error}
                    id="description"
                    name="description"
                    label="Description"
                    margin="normal"
                    variant="outlined"
                    multiline={true}
                    rows={2}
                    rowsMax={4}
                    style={form_style}
                    onChange={props.desValue}
                    value={props.description}
                /><br/>
                 <TextField
                    id="payment_receipt"
                    name="payment_receipt"
                    margin="normal"
                    variant="outlined"
                    type="hidden"
                    style={hiddenStyle}
                    value={props.payment_receipt}
                    onChange={props.payValue}
                />
                 <TextField
                    id="payment_receipt"
                    name="payment_receipt"
                    margin="normal"
                    variant="outlined"
                    type="file"
                    style={style}
                    onChange={props.payValue}
                /><br/> 
               
                <div style={input_style}>
                <PropertiesSelect
                  properties={props.properties!=null?props.properties:null}
                  handleChange={props.handleChange}
                  style={input_style}
                />
                <br/>
                </div>
                <Button style={button_style} variant="contained" color="primary" onClick={props.enter}>
                Submit
                </Button>
            </form>
            </Paper>

            </div>
        )
    
}

export default withStyles(useStyles)(ExpenseForm)