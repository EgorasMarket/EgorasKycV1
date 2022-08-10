import * as React from 'react';
import Slide from '@mui/material/Slide';

import { useAppContext } from '../Context/DataProvider';
import styles from '../styles/Submitted.module.css';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Submitted({}) {
  const value = useAppContext();

  return (
    <div className={styles.container}>
      <p className={styles.header_text}>
        Thank you for submitting your account information.
      </p>
      <p>
        Our onboarding team will review your details and activate your
        account shortly
      </p>

      <span> Note: This may take between 2 to 5 working days</span>
    </div>
  );
}
