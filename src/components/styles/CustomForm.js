import { makeStyles } from '@material-ui/styles';
/**
 * adjust the layout of the form
 */
let useStyles = theme => ({
  root: {
    borderRadius: 10,
    color: '#3f51b5',
    height: '100%',
    paddingTop: 20,
    paddingBottom: 10,
    m: 2,
    position: 'relative'
  },
  header: {
    height: '50px',
    width: '500px',
    position: 'relative',
    left: "25%",
    right: "60%",
    paddingTop: 2,
    backgroundColor: '#3f51b5',

  },
  form_layout: {
    width: '500px',
    paddingTop: 20,
    left: "25%",
    right: "60%",
    position: 'relative',
  },


});
let text_header = {
  margin: 8,
  left: "15%",
  textAlign: "center",
  color: 'white',
  backgroundColor: '#3f51b5',


}

let button_style = {
  margin: 8,
  left: "15%",
  width: "100px",
  color: 'white'
}

let form_style = {
  margin: 8,
  left: "15%",
  width: "300px",
  color: '#3f51b5',
  columnGap: '200px',

}

let form_style_supply = {
  margin: 8,
  left: "15%",
  width: "300px",
  color: 'black',
  columnGap: '100px',
  backgroundColor: 'white'

}

const select = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

export { form_style, useStyles, select, button_style, text_header,form_style_supply }