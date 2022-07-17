import { v4 as uuid4 } from 'uuid';
import { SET_ALERT_POP, REMOVE_ALERT } from './types';

//function to show error msg
export const popupsetAlert = (msg, alertType, timeout = 115000) => (dispatch) => {
  const id = uuid4();

  dispatch({
    type: SET_ALERT_POP,
    payload: {
      msg,
      alertType,
      id,
    },
  });
 

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
