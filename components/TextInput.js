import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react';

import {
  TextField,
  FormControl,
  InputLabel,
  Input,
} from '@mui/material';

import AppContext from '../Context/AppContext';
import validateNIN from '../Helpers/validations/ValidateNIN';

const TextInput = ({
  title,
  label,
  id,
  parentCallback,
  data,
  error,
  onChange,
}) => {
  const value = useContext(AppContext);
  const [ninData, setNinData] = useState('');

  // console.log(ninData);

  //destructure the client object
  // const { name, nin } = value.state.client;
  return (
    <div>
      <FormControl variant="standard">
        <InputLabel htmlFor="nin">{title}</InputLabel>
        <Input
          className="main_input"
          id={id || 'id'}
          aria-describedby="component-error-text"
          value={data}
          type="number"
          error={error}
          onChange={onChange}
        />
      </FormControl>
    </div>
  );
};

export default TextInput;
