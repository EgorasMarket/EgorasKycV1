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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProcessingDialog({ children, message }) {
  //   const [open, setOpen] = React.useState(false);

  const value = useContext(AppContext);
  const open = value.state.processing;

  const handleClickOpen = ({}) => {
    value.setProcessing(true);
  };

  const handleClose = () => {
    value.setProcessing(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <div className={styles.container}>
          <p className={styles.heading}>{message || 'Processing'}</p>
        </div>
      </Dialog>
    </div>
  );
}
