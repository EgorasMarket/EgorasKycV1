import React, { useContext } from 'react';
import ButtonTypes from '../Helpers/ButtonTypes';
import styles from '../styles/CustomButtons.module.css';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import AppContext from '../Context/AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const CustomButtons = ({
  title,
  onClick,
  padding,
  type,
  disabled,
  loading,
}) => {
  const value = useContext(AppContext);
  if (type == ButtonTypes.plain) {
    return (
      <div>
        <button
          className={styles.plain}
          onClick={onClick}
          disabled={disabled}
        >
          {title}
          {loading && <FontAwesomeIcon icon={faSpinner} spin />}
        </button>
      </div>
    );
  } else if (type === ButtonTypes.rounded) {
    return (
      <div>
        <button
          onClick={onClick}
          className={styles.rounded}
          disabled={disabled}
        >
          {title}
        </button>
      </div>
    );
  } else if (type === ButtonTypes.back) {
    return (
      <div
        className={styles.back}
        onClick={() => {
          value.change(() => value.state.stage - 1);
        }}
      >
        <KeyboardBackspaceIcon />
        <p onClick={onClick}>{title}</p>
      </div>
    );
  } else {
    return (
      <div>
        <button onClick={onClick} className={styles.container}>
          {'plain'}
        </button>
      </div>
    );
  }
};

export default CustomButtons;
