import * as React from 'react';

import Slide from '@mui/material/Slide';
import AppContext from '../Context/AppContext';
import { useContext } from 'react';
import { useAppContext } from '../Context/DataProvider';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Submitted({}) {
  const value = useAppContext();

  return (
    <div>
      <p>finally</p>
    </div>
  );
}
