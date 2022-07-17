import { v4 as uuid4 } from 'uuid';
import { SET_ALERT_POPUP, REMOVE_ALERT_POPUP } from './types';

//function to show error msg
export const setAlert2 = (msg, alertType, timeout = 5000) => (dispatch) => {
  const id = uuid4();
console.log("hello popup alert")
  dispatch({
    type: SET_ALERT_POPUP,
    payload: {
      msg,
      alertType,
      id,
    },
  });
 

  setTimeout(() => dispatch({ type: REMOVE_ALERT_POPUP, payload: id }), timeout);
};
