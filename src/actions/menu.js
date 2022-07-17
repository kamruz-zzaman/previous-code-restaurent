import axios from 'axios';
import { setAlert } from './alert';
import configData from "../config.json";
import {ADD_MENU, UPDATE_MENU, UPDATE_MENU_ERROR ,ADD_MENU_ERROR, GET_MENU, GET_MENU_ERROR, EDIT_MENU, EDIT_MENU_ERROR} from './types';

//Get menu
export const getmenu = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${configData.SERVER_URL}/api/menu/AllbuId/${id}`);
console.log(res)
    dispatch({
      type: GET_MENU,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
     type: GET_MENU_ERROR,
     payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};



//add menu
export const addmenu = (menu, id) => async (dispatch) => {
    
  try {
    const res = await axios.post(`${configData.SERVER_URL}/api/menu/multiple/${id}`, {menu});
    console.log(res)
    dispatch({
      type: ADD_MENU,
      payload: res.data,
    });
    dispatch(setAlert('Menu Added ', 'success'));
    window.location.reload(false)
  } catch (err) {
    const errors = err.response.data.errors;
  
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: ADD_MENU_ERROR,
    });
  }
};

//edit menu
export const Editmenu = (menu, id) => async (dispatch) => {
    
  try {
    const res = await axios.patch(`${configData.SERVER_URL}/api/menu/Edit/multiple`, {menu});
    dispatch({
      type: EDIT_MENU,
      payload: res.data,
    });
    dispatch(setAlert('Changes Saved ', 'success'));
    window.location.reload(false)
  } catch (err) {
    const errors = err.response.data.errors;
    
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: EDIT_MENU_ERROR,
    });
  }
};

export const Editmenusingle = (Data, id) => async (dispatch) => {
 
  try {
    const res = await axios.patch(`${configData.SERVER_URL}/api/menu/Updatemenu`,Data);
    //console.log(res)
    dispatch({
      type: UPDATE_MENU,
      payload: res.data,
    });
    dispatch(setAlert('Restaurant Updated','success'));
    window.location.reload(false)
  } catch (err) {
    const errors = err.response.data.errors;
    
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: UPDATE_MENU_ERROR,
    });
   
  }
  };