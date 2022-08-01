import React, { useContext } from 'react';

import AppContext from '../Context/AppContext';
import Stages from '../Context/Stages';
import ButtonTypes from '../Helpers/ButtonTypes';
import validateNIN from '../Helpers/validations/ValidateNIN';
import CustomButtons from './CustomButtons';
import TextInput from './TextInput';
import Image from 'next/image';

const BackId = () => {
  const value = useContext(AppContext);

  return (
    <div className="container">
      <CustomButtons title={'back'} type={ButtonTypes.back} />
      <div className="kyc-modal">
        <div>
          <h1 className="title"> Provide the Front of Your ID </h1>
          <h4>Photo must be of good quality</h4>
        </div>

        <div>
          <Image src={'/image.jpeg'} width={200} height={100} />
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

export default BackId;
