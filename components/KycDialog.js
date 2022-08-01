import React, { useContext } from 'react';

import AppContext from '../Context/AppContext';
import Stages from '../Context/Stages';
import ButtonTypes from '../Helpers/ButtonTypes';
import CustomButtons from './CustomButtons';

const KycDialog = () => {
  const value = useContext(AppContext);

  return (
    <div className="container">
      <div className="kyc-modal">
        <div className="title">
          <h1> Hi Kingsley Goodluck</h1>
        </div>

        <div className="content">
          As part of the Egoras Technologies Know Your Customer (KYC)
          process, we need to collect your identity details. Please
          ensure all the details provided are accurate.
        </div>

        <CustomButtons
          title={'start'}
          type={ButtonTypes.plain}
          onClick={() => {
            value.change(Stages.termsOfService);
          }}
        />
      </div>
    </div>
  );
};

export default KycDialog;
