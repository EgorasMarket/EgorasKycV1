import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';

import AppContext from '../Context/AppContext';
import { Stages } from '../Context/StagesConfig';

import ButtonTypes from '../Helpers/ButtonTypes';
import { useAppContext } from '../Context/DataProvider';
import CustomButtons from './CustomButtons';
import axios from 'axios';
import { API_URL } from '../Helpers/types';
import { config } from '../Helpers/global';

const KycDialog = () => {
  const router = useRouter();
  const query = router.query;
  const address = query.id;
  const value = useAppContext();
  const [loading, setIsloading] = useState(false);
  const [payload, setPayload] = useState({});

  useEffect(() => {
    const main = async () => {
      try {
        console.log('here i am');
        const res = await axios.get(
          `${API_URL}/api/user/validate/id/${address}`,
          config,
          null
        );
        setPayload(res.data.payload);
        console.log(res);
      } catch (err) {
        console.log(err.response);
      }
    };
    main();
    // add here
    console.log('apple');
  }, []);
  return (
    <div className="container">
      <div className="kyc-modal">
        <div className="title">
          <h1>
            {' '}
            {` Hi ${payload.firstname} ${payload.lastname}` || 'user'}
          </h1>
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
