import axios from 'axios';
import configData from "../config.json";

import {GET_ADMIN, GET_ADMIN_ERROR, GET_ALL_RESTUARANT,GET_ALL_RESTUARANT_ERROR, GET_OWNER, GET_OWNER_ERROR} from './types';





//get admin 

export const getadmin = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${configData.SERVER_URL}/api/owner/${id}`);

    dispatch({
      type: GET_ADMIN,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
     type: GET_ADMIN_ERROR,
     payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};


//get all restaurant
export const getallrestuarant = () => async (dispatch) => {
    try {
      const res = await axios.get(`${configData.SERVER_URL}/api/restaurant`);
  
      dispatch({
        type: GET_ALL_RESTUARANT,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
       type: GET_ALL_RESTUARANT_ERROR,
       payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };


  //get all owners without restuarant
  export const getowner = () => async (dispatch) => {
    try {
      const res = await axios.get(`${configData.SERVER_URL}/api/owner/getAllowner/withourrestaurant`);
 
      dispatch({
        type: GET_OWNER,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
       type: GET_OWNER_ERROR,
       payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
  

  