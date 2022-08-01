import React, { useContext } from 'react';

import AppContext from '../Context/AppContext';
import Stages from '../Context/Stages';
import ButtonTypes from '../Helpers/ButtonTypes';
import validateNIN from '../Helpers/validations/ValidateNIN';
import CustomButtons from './CustomButtons';
import TextInput from './TextInput';

const SelectDocument = () => {
  const value = useContext(AppContext);

  return (
    <div className="container">
      <CustomButtons title={'back'} type={ButtonTypes.back} />
      <div className="kyc-modal">
        <div className="title">
          <h1> Enter NIN number to begin </h1>
        </div>

        <TextInput title={'Enter NIN '} />

        <CustomButtons
          title={'start'}
          type={ButtonTypes.plain}
          onClick={() => {
            //check if the nin passes validation

            if (!validateNIN(value.state.client.nin)) {
              alert('An error occured');
              return;
            }

            //proceed to next stage
            value.change(Stages.frontID);
          }}
        />
      </div>
    </div>
  );
};

export default SelectDocument;
