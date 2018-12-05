import { SET_CURRENT_USER, UNSET_CURRENT_USER } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true
      };
    case UNSET_CURRENT_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: false
      };
    default:
      return state;
  }
};
