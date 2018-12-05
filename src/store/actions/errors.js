import { SET_ERRORS, UNSET_ERRORS } from './types';

export const setErrors = errors => ({
  type: SET_ERRORS,
  payload: errors
});

export const unsetErrors = () => ({
  type: UNSET_ERRORS,
  payload: {}
});
