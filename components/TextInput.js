import React, { useContext } from 'react';
import {
  TextField,
  FormControl,
  InputLabel,
  Input,
} from '@mui/material';

import AppContext from '../Context/AppContext';
import validateNIN from '../Helpers/validations/ValidateNIN';

const TextInput = ({ title, label, id }) => {
  const value = useContext(AppContext);
  //destructure the client object
  const { name, nin } = value.state.client;
  return (
    <div>
      <FormControl variant="standard">
        <InputLabel htmlFor="nin">{title}</InputLabel>
        <Input
          className="main_input"
          id={id || 'id'}
          aria-describedby="component-error-text"
          value={nin}
          type="number"
          error={!validateNIN(value.state.client.nin)}
          onChange={(e) => {
            //check for validation
            //set validation rules for th   is field

            //save the value of the input to useCOntext Store
            let result = validateNIN(e.target.value);
            console.log(result);
            value.setClientInfo({
              nin: e.target.value,
            });

            console.log(value);
          }}
        />
      </FormControl>
    </div>
  );
};

export default TextInput;
