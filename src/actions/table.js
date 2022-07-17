import axios from 'axios';
import configData from "../config.json";
import {GET_TABLES, GET_TABLES_ERROR} from './types';





//get variation 

export const gettables = (id) => async (dispatch) => {
  try {
    const ress = await axios.get(`${configData.SERVER_URL}/api/restaurant/Restuarant/tables/${id}`);
  console.log(ress)
    dispatch({
      type: GET_TABLES,
      payload: ress.data,
    });
  } catch (err) {
    dispatch({
     type: GET_TABLES_ERROR,
     payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};