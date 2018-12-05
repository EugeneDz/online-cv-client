import { SET_ERRORS, UNSET_ERRORS } from '../actions/types';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ERRORS:
      return action.payload;
    case UNSET_ERRORS:
      return action.payload;
    default:
      return state;
  }
};
