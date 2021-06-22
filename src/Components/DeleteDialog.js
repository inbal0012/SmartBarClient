import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function DeleteDialog(props) {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        {'Are you sure you want to delete ' + props.name + '?'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          you will not be able to find it again
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button id='No' onClick={props.handleClose} color='primary' autoFocus>
          No
        </Button>
        <Button id='Yes' onClick={props.handleClose} color='primary'>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
