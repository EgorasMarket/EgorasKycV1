import React, { useContext } from 'react';

import AppContext from '../Context/AppContext';
import { Stages } from '../Context/StagesConfig';
import ButtonTypes from '../Helpers/ButtonTypes';
import validateNIN from '../Helpers/validations/ValidateNIN';
import CustomButtons from './CustomButtons';
import TextInput from './TextInput';
import Image from 'next/image';

const BackId = () => {
  const value = useContext(AppContext);
  let stage = value.state.stage;

  // const next = () => {
  //   return value.state.stage++;
  // };

  const previous = () => {
    return value.state.stage++;
  };

  return (
    <div className="container">
      <CustomButtons title={'back'} type={ButtonTypes.back} />
      <div className="kyc-modal">
        <div>
          <h1 className="title"> Provide the Back of Your ID </h1>
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
            // value.change(Stages.backID);
            console.log();
            value.change(stage++);
          }}
        />
      </div>
    </div>
  );
};

export default BackId;
