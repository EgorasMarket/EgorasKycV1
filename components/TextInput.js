import React, { useState, useEffect, useContext, useCallback } from "react";

import { TextField, FormControl, InputLabel, Input } from "@mui/material";

import AppContext from "../Context/AppContext";
import validateNIN from "../Helpers/validations/ValidateNIN";

const TextInput = ({ title, label, id, parentCallback }) => {
  const value = useContext(AppContext);
  const [ninData, setNinData] = useState("");

  // console.log(ninData);

  //destructure the client object
  // const { name, nin } = value.state.client;
  return (
    <div>
      <FormControl variant="standard">
        <InputLabel htmlFor="nin">{title}</InputLabel>
        <Input
          className="main_input"
          id={id || "id"}
          aria-describedby="component-error-text"
          value={ninData}
          type="number"
          error={!validateNIN(ninData)}
          onChange={(e) => {
            //check for validation
            //set validation rules for th   is field

            //save the value of the input to useCOntext Store
            let result = validateNIN(e.target.value);
            // console.log(result);
            if (result) {
              setNinData(e.target.value);
              parentCallback(e.target.value);
            } else {
            }
            // value.setClientInfo({
            //   nin: e.target.value,
            // });

            // console.log(e.target.value);
          }}
        />
      </FormControl>
    </div>
  );
};

export default TextInput;
