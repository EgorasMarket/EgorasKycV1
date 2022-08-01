import { useContext } from 'react';
import AppContext from './AppContext';

const Stages = Object.freeze({
  intro: 1,
  termsOfService: 2,
  inputNIN: 3,
  frontID: 4,
  backID: 5,
  selfie: 6,
});

const next = () => {
  const stage = useContext(AppContext);

  stage.change(stage.state.stage++);
  // fetch from the context information

  return stage;
};
export { Stages };
