import { SET_CURRENT_PROFILE, UNSET_CURRENT_PROFILE } from './types';

export const setCurrentProfile = profile => ({
  type: SET_CURRENT_PROFILE,
  payload: profile
});

export const unsetCurrentProfile = () => ({
  type: UNSET_CURRENT_PROFILE,
  payload: {}
});
