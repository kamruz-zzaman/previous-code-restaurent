import axios from 'axios';
import configData from "../config.json";
import {GET_NOTIFICATION, GET_NOTIFICATION_ERROR
  
} from './types';

//Get notification
export const getnotification = (id) => async (dispatch) => {
  try {
   const res = await axios.get(`${configData.SERVER_URL}/api/notification/${id}`);

  dispatch({
      type: GET_NOTIFICATION,
    payload: res.data,
   });
  } catch (err) {
   dispatch({
    type: GET_NOTIFICATION_ERROR,
   payload: { msg: err.response.statusText, status: err.response.status },
 });
 }
};

export const setnotifistatus = (id) => async (dispatch) => {
  try {
    const res = await axios.patch(`${configData.SERVER_URL}/api/notification/${id}`);

   console.log(res)
  } catch (err) {
    
     
    
  }
};

export const deletenotification = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`${configData.SERVER_URL}/api/notification/${id}`);

   console.log(res)
  } catch (err) {
    
     
    
  }
};
