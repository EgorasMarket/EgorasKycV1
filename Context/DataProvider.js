import { createContext, useContext } from 'react';

const AppContext = createContext();

export const DataProvider = ({ values, children }) => {
  return (
    <AppContext.Provider value={values}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
