import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useContext, useEffect } from 'react';
import AppContext from '../Context/AppContext';
import { Stages } from '../Context/StagesConfig';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useAppContext } from '../Context/DataProvider';
import { API_URL } from '../Helpers/types';
import axios from 'axios';
import { config } from '../Helpers/global';

export default function Home() {
  // const value = useContext(AppContext);
  const value = useAppContext();

  const KycDialog = dynamic(() => import('../components/KycDialog'));
  const PrivacyPolicy = dynamic(() =>
    import('../components/PrivacyPolicy')
  );
  const SelectDocument = dynamic(() =>
    import('../components/SelectDocument')
  );
  const FrontId = dynamic(() => import('../components/FrontId'));
  const BackId = dynamic(() => import('../components/BackId'));
  const FaceShot = dynamic(() => import('../components/FaceShot'));

  //destructure the context variables

  // let { name, stage } = value.state;
  let { name, stage } = value.state;
  const router = useRouter();
  const query = router.query;
  const address = query.id;
  const fetchData = async () => {};

  return (
    <div className={styles.container}>
      {stage === Stages.intro && <KycDialog stage={Stages.intro} />}

      {stage === Stages.termsOfService && (
        <PrivacyPolicy stage={Stages.termsOfService} />
      )}

      {stage && stage === Stages.inputNIN && (
        <SelectDocument stage={Stages.inputNIN} />
      )}
      {stage && stage === Stages.frontID && (
        <FrontId stage={Stages.frontID} />
      )}

      {stage && stage === Stages.backID && (
        <BackId stage={Stages.backID} />
      )}
      {stage && stage === Stages.faceScan && (
        <FaceShot stage={Stages.faceScan} />
      )}
    </div>
  );
}
