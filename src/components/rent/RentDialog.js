import React from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
/**
 * Dialog Page to Enter the Rent Amount
 * @param {string} amount - rent amount
 */
const RentDialog = (props) => {

    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">Rent</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please Enter the Rent Amount
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    variant="outlined"
                    id="amount"
                    label="Amount"
                    type="amount"
                    onChange={props.amountValue}
                    value={props.amount}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={props.enterValue} color="primary">
                    Enter
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default RentDialog;
