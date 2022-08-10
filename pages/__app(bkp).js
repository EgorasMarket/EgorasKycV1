import '../styles/globals.css';

import AppContext from '../Context/AppContext';
import { useState } from 'react';
import { Stages } from '../Context/StagesConfig';

function MyApp({ Component, pageProps }) {
  const [stage, setStage] = useState(Stages.intro);
  const [clientInfo, setClientInfo] = useState({
    name: 'John Doe',
    nin: 123456789,
  });

  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  return (
    <AppContext.Provider
      value={{
        state: {
          stage: stage,
          name: 'goodluck',
          client: clientInfo,
          processing: open,
          confirmation: confirm,
        },

        change: setStage,
        setClientInfo: setClientInfo,
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
    </AppContext.Provider>
  );
}

export default MyApp;
