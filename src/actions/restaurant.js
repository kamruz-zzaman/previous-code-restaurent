import axios from 'axios';
import { setAlert } from './alert';
import { ADD_MENU, ADD_MENU_ERROR, REGISTER_SUCCESS, GET_RESTUARANT, GET_RESTUARANT_ERROR, GET_RESTUARANT_BY_ADMIN, GET_RESTUARANT_BY_ADMIN_ERROR } from './types';
import configData from "../config.json";



//add restaurant 
export const addrestaurant = () => async (dispatch) => {

  try {
    const res = await axios.post(`${configData.SERVER_URL}/api/resturent/1`);
    dispatch({
      type: ADD_MENU,
      payload: res.data,
    });
    dispatch(setAlert('Restaurant Added ', 'success'));
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


//edit restaurant 

export const Editrestaurant = (FormData, Data, id) => async (dispatch) => {

  try {
    const res = await axios.patch(`${configData.SERVER_URL}/api/restaurant/UpdateResturantDetails/${id}`, FormData);
    console.log(res)
    if (Data) {
      await axios.patch(`${configData.SERVER_URL}/api/restaurant/uploadimage/${id}`, Data);

    }
    dispatch(setAlert('Restaurant Updated', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }


  }
};


//get restaurant 

export const getrestaurant = (id) => async (dispatch) => {
  console.log(id);
  const config = {
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json',
      "Authorization": `Bearer ${localStorage.token}`
    },
  };
  try {
    const res = await axios.get(`${configData.SERVER_URL}/api/restaurant/${id}`, config);
    // const res = await axios.get(`${configData.SERVER_URL}/api/restaurant/1`, config);
    console.log(res);
    dispatch({
      type: GET_RESTUARANT,
      payload: res.data.restaurant,
    });
  } catch (err) {
    dispatch({
      type: GET_RESTUARANT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// upload restaurant image
export const addLogo = (Data, id) => async (dispatch) => {

  try {
    const res = await axios.patch(`${configData.SERVER_URL}/api/restaurant/uploadimage/${id}`, Data);

    dispatch(setAlert('Logo Added', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }


  }
};

//get restaurant in admin dashboard to edit
export const GetRestaurantbyadmin = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${configData.SERVER_URL}/api/restaurant/${id}`);

    dispatch({
      type: GET_RESTUARANT_BY_ADMIN,
      payload: res.data,
    });

  } catch (err) {
    dispatch({
      type: GET_RESTUARANT_BY_ADMIN_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//edit restaurant  by admin 

export const Editrestaurantbyadmin = (Data, id) => async (dispatch) => {


  try {
    const res = await axios.patch(`${configData.SERVER_URL}/api/restaurant/UpdateResturantDetails/byadmin/${id}`, Data);

    dispatch(setAlert('Restaurant Updated', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }


  }
};

//add restaurant
export const Addrestaurant = (Data, id) => async (dispatch) => {


  try {
    const res = await axios.post(`${configData.SERVER_URL}/api/restaurant/${id}`, Data);

    dispatch(setAlert('Restaurant Added', 'success'));

  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }


  }
};

// add restaurant by owner
export const Addrestaurantbyowner = (Data, id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json',
      "Authorization": `Bearer ${localStorage.token}`
    },
  };
  try {
    const res = await axios.post(`${configData.SERVER_URL}/api/restaurant/`, Data, config);
    console.log("resturent", res)

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(setAlert('Restaurant Added', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }


  }
};



