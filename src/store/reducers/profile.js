import { SET_CURRENT_PROFILE, UNSET_CURRENT_PROFILE } from '../actions/types';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_PROFILE:
      return action.payload;
    case UNSET_CURRENT_PROFILE:
      return action.payload;
    default:
      return state;
  }
};
