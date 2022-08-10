import '../styles/globals.css';

import AppContext from '../Context/AppContext';
import { useState } from 'react';
import { Stages } from '../Context/StagesConfig';

import { DataProvider } from '../Context/DataProvider';

function MyApp({ Component, pageProps }) {
  const [stage, setStage] = useState(Stages.intro);
  const [clientInfo, setClientInfo] = useState({});

  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [address, setAddress] = useState('');
  const [id, setId] = useState('');
  return (
    <DataProvider
      values={{
        state: {
          stage: stage,
          name: 'goodluck',
          client: clientInfo,
          processing: open,
          confirmation: confirm,
          address: address,
        },

        change: setStage,
        setClientInfo: setClientInfo,
        setAddress: setAddress,
        setId: setId,
        setProcessing: setOpen,
        toggleProcessing: () => {
          setOpen(!open);
        },
        closeDialog: () => {
          setOpen(false);
        },

        setConfirm: setConfirm,
        toggleConfirm: () => {
          setConfirm(!confirm);
        },
        closeDialog: () => {
          setConfirm(false);
        },
      }}
    >
      <Component {...pageProps} />
    </DataProvider>
  );
}

export default MyApp;
