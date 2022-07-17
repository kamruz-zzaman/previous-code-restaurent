import axios from 'axios';
import {GET_DEALS,GET_DEALS_ERROR,GET_USER_DEALS,GET_USER_DEALS_ERROR} from './types';
import configData from "../config.json";




//Get deal dishes by dealID
export const getdeal = (id) => async (dispatch) => {
    try {
      const res = await axios.get(`${configData.SERVER_URL}/api/dishes/getdealsdishes/${id}`);
    
      dispatch({
        type: GET_DEALS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
       type: GET_DEALS_ERROR,
       payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
  
//get deals dishes list to show on user menu
  export const getuserdeal = () => async (dispatch) => {
    try {
      const res = await axios.get(`${configData.SERVER_URL}/api/dishes/getusermenu/dealsdishes`);
    
      dispatch({
        type: GET_USER_DEALS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
       type: GET_USER_DEALS_ERROR,
       payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
  
