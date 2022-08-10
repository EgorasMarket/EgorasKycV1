import React from 'react';
import ButtonTypes from '../Helpers/ButtonTypes';

import styles from '../styles/ErrorComponent.module.css';
import CustomButtons from './CustomButtons';

const ErrorComponent = ({ message, onRetry }) => {
  return (
    <div className={styles.container}>
      <h3>An error occured</h3>

      <div>
        <p>{message || 'error occured'}</p>
      </div>

      <CustomButtons
        onClick={onRetry}
        title="retry"
        type={ButtonTypes.plain}
      />
    </div>
  );
};

export default ErrorComponent;
