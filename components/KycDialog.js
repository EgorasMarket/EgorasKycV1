import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';

import AppContext from '../Context/AppContext';
import { Stages } from '../Context/StagesConfig';

import ButtonTypes from '../Helpers/ButtonTypes';
import CustomButtons from './CustomButtons';

const KycDialog = () => {
  const router = useRouter();
  const query = router.query;
  const address = query.id;
  const value = useContext(AppContext);
  const [loading, setIsloading] = useState(false);

  return (
    <div className="container">
      <div className="kyc-modal">
        <div className="title">
          <h1> Hi {address}</h1>
        </div>

        <div className="content">
          As part of the Egoras Technologies Know Your Customer (KYC)
          process, we need to collect your identity details. Please
          ensure all the details provided are accurate.
        </div>

        <CustomButtons
          title={'start'}
          type={ButtonTypes.plain}
          loading={loading}
          onClick={() => {
            setIsloading(!loading);
            value.change(Stages.termsOfService);
          }}
        />
      </div>
    </div>
  );
};

export default KycDialog;
