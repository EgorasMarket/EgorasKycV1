import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';

import Slide from '@mui/material/Slide';

import styles from '../styles/Dialog.module.css';
import { useAppContext } from '../Context/DataProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProcessingDialog({ children, message }) {
  //   const [open, setOpen] = React.useState(false);

  const value = useAppContext();
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
          {/* <p className={styles.heading}>{message || 'Processing'}</p> */}

          <FontAwesomeIcon icon={faSpinner} spin />
        </div>
      </Dialog>
    </div>
  );
}
