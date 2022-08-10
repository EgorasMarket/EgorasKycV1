import React, { useContext, useCallback, useState } from 'react';

import axios from 'axios';

import AppContext from '../Context/AppContext';
import { Stages } from '../Context/StagesConfig';
import ButtonTypes from '../Helpers/ButtonTypes';
import validateNIN from '../Helpers/validations/ValidateNIN';
import CustomButtons from './CustomButtons';
import TextInput from './TextInput';
import { API_URL } from '../Helpers/types';

const SelectDocument = () => {
  const value = useContext(AppContext);
  const [ninData, setNinData] = useState('');
  const [loading, setIsloading] = useState(false);
  const [placeholder, setPlaceHolder] = useState('proceed');
  const [disabled, setDisabled] = useState(!validateNIN(ninData));

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const callback = useCallback((count) => {
    setNinData(count);
    // console.log(count);
  }, []);

  const sendNin = async (e) => {
    if (!validateNIN(ninData)) {
      return;
    }

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
      setIsloading(!loading);
      setPlaceHolder('processing');
      setDisabled(true);

      const res = await axios.post(
        API_URL +
          '/api/kyc/submit/nin/number/0x1eD8d75fbAb7Dc60d708c69fE0743396467a86F4',
        postData,
        config
      );
      console.log(res.data, 'undefined');
      if (res.data.statusCode === 200) {
        setIsloading(false);
        setDisabled(!disabled);
        setPlaceHolder('done');
        console.log(res.data);
        value.change(Stages.frontID);
      } else {
        setPlaceHolder('retry');
        setDisabled(!disabled);
        console.log(res.data);
      }
    } catch (err) {
      setIsloading(false);
      setDisabled(false);
      setPlaceHolder('retry');
      console.log(err.response);
    }
  };

  return (
    <div className="container">
      <CustomButtons title={'back'} type={ButtonTypes.back} />
      <div className="kyc-modal">
        <div className="title">
          <h1> Enter NIN number to begin </h1>
          <p>NIN numbers are usually 11 digits long</p>
        </div>

        <TextInput
          title={'Enter NIN '}
          parentCallback={callback}
          data={ninData}
          error={!validateNIN(ninData)}
          onChange={(e) => {
            if (e.target.value.length <= 11) {
              setNinData(e.target.value);
            }
            setDisabled(false);
          }}
        />

        <CustomButtons
          title={placeholder}
          type={ButtonTypes.plain}
          onClick={sendNin}
          loading={loading}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default SelectDocument;
