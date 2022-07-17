import axios from 'axios';
import { setAlert } from './alert';
import { ADD_DISH, ADD_DISH_ERROR, GET_DISHES, UPDATE_DISH, UPDATE_DISH_ERROR, GET_DISHES_ERROR, ALL_DISHES, ALL_DISHES_ERROR, UPLOAD_DISH_IMAGE, UPLOAD_DISH_IMAGE_ERROR } from './types';
import configData from "../config.json";


//add dish
export const adddish = (dishes, id) => async (dispatch) => {

  try {
    const res = await axios.post(`${configData.SERVER_URL}/api/dishes/multiple/${id}`, { dishes });
    dispatch({
      type: ADD_DISH,
      payload: res.data,
    });
    dispatch(setAlert('Dish Added ', 'success'));
    window.location.reload(false)
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: ADD_DISH_ERROR,
    });
  }
};

export const adddealdish = (dishes, id) => async (dispatch) => {

  try {
    const res = await axios.post(`${configData.SERVER_URL}/api/dishes/multiple/deal/${id}`, { dishes });
    dispatch({
      type: ADD_DISH,
      payload: res.data,
    });
    dispatch(setAlert('Deal Added ', 'success'));
    window.location.reload(false)
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: ADD_DISH_ERROR,
    });
  }
};

// upload dish image
export const addimage = (Data, id) => async (dispatch) => {

  try {
    const res = await axios.patch(`${configData.SERVER_URL}/api/dishes/uploadimage/${id}`, Data);
    dispatch({
      type: UPLOAD_DISH_IMAGE,
      payload: res.data,
    });
    dispatch(setAlert('Image Added', 'success'));
    window.location.reload(false)
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: UPLOAD_DISH_IMAGE_ERROR,
    });
  }
};


//Get dish by menu ID
export const getdish = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${configData.SERVER_URL}/api/dishes/${id}`);

    dispatch({
      type: GET_DISHES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_DISHES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};




//get all dishes of a restuarant
export const getAlldish = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json',
      "Authorization": `Bearer ${localStorage.token}`
    },
  };
  try {
    const res = await axios.get(`${configData.SERVER_URL}/api/dishes/All/dishes/${id}`, config);
    console.log(res)
    dispatch({
      type: ALL_DISHES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ALL_DISHES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//edit dish
export const Editdish = (dishes, id) => async (dispatch) => {

  try {
    const res = axios.patch(`${configData.SERVER_URL}/api/dishes/Edit/multiple/:${id}`, { dishes });
    console.log(res)
    dispatch(setAlert('Changes Saved ', 'success'));
    window.location.reload(false)
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }


  }
};



export const Editdishsingle = (Data, id) => async (dispatch) => {

  try {
    const res = await axios.patch(`${configData.SERVER_URL}/api/dishes/Updatedish`, Data);
    console.log(res)
    dispatch({
      type: UPDATE_DISH,

    });
    dispatch(setAlert('Changes Saved', 'success'));
    window.location.reload(false)
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: UPDATE_DISH_ERROR,
    });

  }
};


export const deletedish = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`${configData.SERVER_URL}/api/dishes/${id}`);
    dispatch(setAlert('Dish deleted ', 'success'));
    window.location.reload(false)
    //console.log(res)
  } catch (err) {

    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));

    }


  }
};