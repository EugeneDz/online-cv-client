import { SET_DEMO, UNSET_DEMO } from './types';

export const setDemo = demo => ({
  type: SET_DEMO,
  payload: demo
});

export const unsetDemo = () => ({
  type: UNSET_DEMO,
  payload: {}
});
