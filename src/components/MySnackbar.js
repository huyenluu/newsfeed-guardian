import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert variant="filled" {...props} />;
}


export default function MySnackbar({open,setOpen, message}) {

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
      <Snackbar 
        open={open} 
        autoHideDuration={6000} 
        onClose={handleClose}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }}
        >
        <Alert onClose={handleClose} severity="warning">
            {message}
        </Alert>
      </Snackbar>

  );
}