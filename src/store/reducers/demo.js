import { SET_DEMO, UNSET_DEMO } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_DEMO:
      return action.payload;
    case UNSET_DEMO:
      return action.payload;
    default:
      return state;
  }
};
