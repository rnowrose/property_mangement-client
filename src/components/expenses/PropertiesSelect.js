import React, { Component } from 'react';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';
import { select } from './../styles/CustomForm'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
/*** 
 * Properties to be Selected when entering the supplies information
 */
const select_styles = theme => ({
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },

});


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

class PropertiesSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prop: [],
    };

  }

  componentDidMount() {
    this.setState({ isLoading: true });
    fetch("http://localhost:4000/api/properties")
      .then(response => response.json())
      .then(data => {
        this.setState({ prop: data });



      });
  }



  render() {
    const { classes, properties, handleChange } = this.props;
    const { prop } = this.state;
    let prop_info = prop.map(
      pid => (
        <MenuItem key={pid.address} value={pid.prop_id}>
          <ListItemText primary={pid.address} />
        </MenuItem>
      )
    )

    return (
      <div>
        <FormControl variant="outlined" className={select.formControl} fullWidth>

          <InputLabel
            htmlFor="properties"
            style={this.props.style}
          >
            Properties
          </InputLabel>
          <Select
            multiple
            value={properties !== null ? properties : []}
            onChange={handleChange}
            input={
              <OutlinedInput
                labelWidth={70}
                name="properties"
                id="properties"
              />
            }
            renderValue={selected => (
              <div className={classes.chips}>
                {selected.map(value => (
                  <Chip key={value} label={value} className={classes.chip} />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
            style={this.props.style}
          >
            {prop_info}
          </Select>
        </FormControl>

      </div>
    )
  }
}

export default withStyles(select_styles, { withTheme: true })(PropertiesSelect)