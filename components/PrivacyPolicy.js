import React, { useContext } from 'react';

import { Stages } from '../Context/StagesConfig';

import styles from '../styles/Privacy.module.css';
import CustomButtons from './CustomButtons';
import ButtonTypes from '../Helpers/ButtonTypes';
import { useAppContext } from '../Context/DataProvider';

const PrivacyPolicy = () => {
  const value = useAppContext();

  return (
    <div className="container">
      <CustomButtons title={'back'} type={ButtonTypes.back} />

      <div className="kyc-modal">
        <div className="content">
          <div>
            <h1 className={styles.title}>Terms of Service </h1>

            <p>
              By clicking Accept or continuing to use this service,
              you agree you read, understand and accept Egoras
              Technologies Terms Of Service
            </p>

            <p>
              FREQUENTLY ASKED QUESTIONS Why do you need my ID,
              Selfie, or Video? We analyze the information contained
              in the images to establish the IDs authenticity. We also
              use facial analysis to compare your photo in the ID
              document to the upload selfie photo or video. What
              happens if I abandon the process after clicking Accept?
              Egoras Technologies wont carry out any checks unless you
              complete the process to the end.
            </p>

            <div className={styles.button_group}>
              <CustomButtons
                type={ButtonTypes.plain}
                title="cancel"
                onClick={() => {
                  value.change(Stages.intro);
                }}
              />
              <CustomButtons
                type={ButtonTypes.rounded}
                title={'Accept  '}
                onClick={() => value.change(Stages.inputNIN)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
