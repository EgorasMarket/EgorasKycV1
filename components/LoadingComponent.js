import React from 'react';
import styles from '../styles/LoadingComponent.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const LoadingComponent = () => {
  return (
    <div className={styles.container}>
      <h1>Please wait</h1>
      <FontAwesomeIcon icon={faSpinner} spin />
    </div>
  );
};

export default LoadingComponent;
