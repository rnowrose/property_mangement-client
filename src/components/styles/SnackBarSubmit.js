import React, { Component } from "react";
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContentWrapper from './SnackbarContents'
import PropTypes from 'prop-types';

/**
 * 
 * used for form validation.
 * Displays only when there is a form error
 */

const SnackBarSubmit = (props) => {
      return (
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={props.open}
            autoHideDuration={6000}
            onClose={props.handleClose}
          >
            <SnackbarContentWrapper
              onClose={props.handleClose}
              variant={props.variant}
              message={props.message}
            />
          </Snackbar>
      );
    
  }
  
  
  export default SnackBarSubmit;