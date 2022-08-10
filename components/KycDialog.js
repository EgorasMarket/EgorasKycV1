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
import LoadingComponent from './LoadingComponent';
import ErrorComponent from './ErrorComponent';

const KycDialog = () => {
  const router = useRouter();
  const query = router.query;
  const address = query.id;
  const value = useAppContext();
  const [loading, setIsloading] = useState(true);
  const [payload, setPayload] = useState({});
  const [isError, setIsError] = useState(false);
  const [info, setError] = useState('');

  const stopLoading = () => {
    setIsloading(false);
  };
  const setExecption = (message) => {
    console.clear();
    stopLoading(); //stop the loader
    setError(message);
    setIsError(true);
  };

  const validateInformation = (payload) => {
    //destructure payload
    const { firstname, lastname, email } = payload;

    if (firstname && lastname && email) {
      return true;
    }

    return false;
  };

  const perform = async () => {
    if (!address) {
      return;
    }
    try {
      await console.log('here i am');
      const call = await axios.get(
        `${API_URL}/api/user/validate/id/${address}`,
        config
      );
      if (!validateInformation(call.data.payload)) {
        setExecption(
          'Information is not sufficient to proceed with KYC'
        );
      }

      setPayload(call.data.payload);
      value.setId(call.data.payload.id);
      value.setAddress(call.data.payload.address);
      stopLoading();
      console.log(call);
    } catch (err) {
      setExecption(err.response.data.message);
      console.log(err.response);
    }
    // };
  };
  useEffect(() => {
    perform();
  }, [address]);
  return (
    <div className="container">
      {loading && (
        <div>
          {' '}
          <LoadingComponent />{' '}
        </div>
      )}

      {isError && (
        <div>
          {' '}
          <ErrorComponent
            message={info}
            onRetry={() => {
              window.location.reload();

              console.log(window.location.reload);
            }}
          />
        </div>
      )}

      {!loading && !isError && (
        <>
          <div className="kyc-modal">
            <div className="title">
              <h1>
                {' '}
                {` Hi ${payload.firstname} ${payload.lastname}` ||
                  'user'}
              </h1>
            </div>

            <div className="content">
              As part of the Egoras Technologies Know Your Customer
              (KYC) process, we need to collect your identity details.
              Please ensure all the details provided are accurate.
            </div>

            <CustomButtons
              title={'begin'}
              type={ButtonTypes.plain}
              loading={loading}
              onClick={() => {
                setIsloading(!loading);
                value.change(Stages.termsOfService);
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default KycDialog;
