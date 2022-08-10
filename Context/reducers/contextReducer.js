import { ActionTypes } from '../actions/ActionTypes';

export const initial_state = {
  state: {
    name: 'goodluck',
  },
};

const appReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case ActionTypes.ADD_ITEM:
      console.log('add item', payload);

    default:
      throw new Error(' no case defined');
  }
};

export default appReducer;
