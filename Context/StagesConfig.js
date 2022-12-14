import { useContext } from 'react';
import AppContext from './AppContext';

const Stages = Object.freeze({
  intro: 1,
  termsOfService: 2,
  inputNIN: 3,
  frontID: 4,
  backID: 5,
  faceScan: 6,
  submitted: 7,
});

export { Stages };
