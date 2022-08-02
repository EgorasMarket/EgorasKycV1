import React, { useContext, useCallback, useState } from "react";

<<<<<<< HEAD
import AppContext from '../Context/AppContext';
import { Stages } from '../Context/StagesConfig';

import ButtonTypes from '../Helpers/ButtonTypes';
import validateNIN from '../Helpers/validations/ValidateNIN';
import CustomButtons from './CustomButtons';
import TextInput from './TextInput';
=======
import axios from "axios";

import AppContext from "../Context/AppContext";
import Stages from "../Context/Stages";
import ButtonTypes from "../Helpers/ButtonTypes";
import validateNIN from "../Helpers/validations/ValidateNIN";
import CustomButtons from "./CustomButtons";
import TextInput from "./TextInput";
>>>>>>> 7f577b1356dc660370cfc57b194e7c8d5278ed40

const SelectDocument = () => {
  const value = useContext(AppContext);
  const [ninData, setNinData] = useState("");
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const callback = useCallback((count) => {
    setNinData(count);
    // console.log(count);
  }, []);

  const sendNin = async (e) => {
    console.log(ninData);
    // if (!validateNIN(value.state.client.nin)) {
    //   alert("An error occured");
    //   return;
    // }

    const postData = JSON.stringify({
      nin_number: ninData,
    });

    console.log(postData);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/kyc/submit/nin/number/0x5dc86878f19E45dE95180E303B8Ff00792D4C4c8",
        postData,
        config
      );
      console.log(res.data, "undefined");
      if (res.data.statusCode === 200) {
        console.log(res.data);
        value.change(Stages.frontID);
      } else {
        console.log(res.data);
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <div className="container">
      <CustomButtons title={"back"} type={ButtonTypes.back} />
      <div className="kyc-modal">
        <div className="title">
          <h1> Enter NIN number to begin </h1>
        </div>

        <TextInput title={"Enter NIN "} parentCallback={callback} />

        <CustomButtons
          title={"start"}
          type={ButtonTypes.plain}
          // onClick={() => {
          //   //check if the nin passes validation

          //   if (!validateNIN(value.state.client.nin)) {
          //     alert("An error occured");
          //     return;
          //   }

          //   //proceed to next stage
          //   value.change(Stages.frontID);
          // }}
          onClick={sendNin}
        />
      </div>
    </div>
  );
};

export default SelectDocument;
