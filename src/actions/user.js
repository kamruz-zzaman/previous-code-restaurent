import axios from 'axios';
import { setAlert } from './alert';
import {GET_USER, GET_USER_ERROR} from './types';
import configData from "../config.json";





//edit Editowner 

export const Editowner = (FormData,Data, id) => async (dispatch) => {



  try {
    const res= await axios.patch(`${configData.SERVER_URL}/api/owner/updateuser/${id}`,FormData);
    console.log(res)
    if(Data){
    await axios.patch(`${configData.SERVER_URL}/api/owner/profileimage/${id}`,Data);
    
    }
    dispatch(setAlert('Profile Updated','success'))
   
  } catch (err) {
    const errors = err.response.data.errors;
    
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
  
   
  }
  };


//get getUser

export const getUser = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${configData.SERVER_URL}/api/owner/${id}`);

    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
     type: GET_USER_ERROR,
     payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};


//Load User with phone number
export const loaduser = (phone) => async (dispatch) => {
  console.log('hello load')
  try {
    const res = await axios.get(`${configData.SERVER_URL}/api/owner/loaduser/bynumber/${phone}`);
    console.log(res)
    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
     type: GET_USER_ERROR,
     payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
