import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import AppContext from '../Context/AppContext';
import { useContext } from 'react';
import styles from '../styles/Dialog.module.css';
import { useAppContext } from '../Context/DataProvider';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmationDialog({
  children,
  message,
  open,
}) {
  // const [show, setShow] = React.useState(true);
  //   const [open, setOpen] = React.useState(false);

  const value = useAppContext();
  const confirm = value.state.confirmation;

  const handleClickOpen = ({}) => {
    value.setConfirm(true);
  };

  const handleClose = () => {
    value.setConfirm(false);
  };

  return (
    <div>
      <Dialog
        open={confirm}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Attention'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You certify that the information you provided is accurate.
            You cannot repeat this process if failed until 10days
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
