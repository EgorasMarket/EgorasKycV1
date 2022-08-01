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
  return (
    <AppContext.Provider
      value={{
        state: {
          stage: stage,
          name: 'goodluck',
          client: clientInfo,
        },

        change: setStage,
        setClientInfo: setClientInfo,
      }}
    >
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}

export default MyApp;
