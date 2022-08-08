import React, { useContext } from 'react';

import AppContext from '../Context/AppContext';
import { Stages } from '../Context/StagesConfig';

import ButtonTypes from '../Helpers/ButtonTypes';
import validateNIN from '../Helpers/validations/ValidateNIN';
import CustomButtons from './CustomButtons';
import TextInput from './TextInput';
import Image from 'next/image';

const Selfie = () => {
  const value = useContext(AppContext);

  return (
    <div className="container">
      <CustomButtons title={'back'} type={ButtonTypes.back} />
      <div className="kyc-modal">
        <div>
          <h1 className="title"> Take a Selfie </h1>
          <h4>Please follow the guidance below</h4>
        </div>

        <div>
          <Image
            src={'/image.jpeg'}
            alt=""
            width={200}
            height={100}
          />
        </div>

        <CustomButtons
          title={'choose'}
          type={ButtonTypes.plain}
          onClick={() => {
            //check if the nin passes validation

            //proceed to next stage
            value.change(Stages.backID);
          }}
        />
      </div>
    </div>
  );
};

export default Selfie;
