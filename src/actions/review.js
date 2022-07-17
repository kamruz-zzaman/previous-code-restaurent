import axios from 'axios';
import { setAlert } from './alert';
import {GET_REVIEW_TAGS,GET_REVIEW_ALL,GET_REVIEW_AVG,GET_REVIEW_AVG_ERROR, GET_REVIEW_CUSTOMER, GET_REVIEW_CUSTOMER_ERROR,GET_REVIEW_TAGS_ERROR,GET_REVIEW_TAGS_EDIT,GET_REVIEW_TAGS_EDIT_ERROR, GET_REVIEW_ALL_ERROR} from './types';
import configData from "../config.json";
import { setAlert2} from './alert2';
import setAuthToken from '../utils/setAuthToken';
import { logout } from './auth';

//get restaurant 

export const getreviewtags = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${configData.SERVER_URL}/api/review/getvalues/${id}`);

    dispatch({
      type: GET_REVIEW_TAGS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
     type: GET_REVIEW_TAGS_ERROR,
     payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getreviewtagsbystar = (id,rid) => async (dispatch) => {
  try {
    const res = await axios.get(`${configData.SERVER_URL}/api/review/getvalues/${id}/${rid}`);

    dispatch({
      type: GET_REVIEW_TAGS_EDIT,
      payload: res.data,
    });
  } catch (err) {
    console.log(err)
    dispatch({
     type: GET_REVIEW_TAGS_EDIT_ERROR,
     payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};




//get review all values
export const getreviewsAll = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${configData.SERVER_URL}/api/review/getreviewAll/${id}`);
console.log(res)
    dispatch({
      type: GET_REVIEW_ALL,
      payload: res.data,
    });
  } catch (err) {
    console.log(err)
    dispatch({
     type: GET_REVIEW_ALL_ERROR,
     payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//get customer review
export const getcustomerreview = (id, start, end) => async (dispatch) => {
  try {
    console.log("Hello API",start,end)
    const res = await axios.get(`${configData.SERVER_URL}/api/review/getcustomerreview/${id}/${start}/${end}`);
console.log(res)
    dispatch({
      type: GET_REVIEW_CUSTOMER,
      payload: res.data,
    });
  } catch (err) {
    console.log(err)
    dispatch({
     type: GET_REVIEW_CUSTOMER_ERROR,
     payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//get reviews
export const getreview= (id,rate,start,end) => async (dispatch) => {
  try {
    console.log(start,end)
    const res = await axios.get(`${configData.SERVER_URL}/api/review/getreview/${id}/${rate}/${start}/${end}`);
console.log(res)
    dispatch({
      type: GET_REVIEW_ALL,
      payload: res.data,
    });
  } catch (err) {
    console.log(err)
    dispatch({
     type: GET_REVIEW_ALL_ERROR,
     payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};




//get review avg
export const getreviewavg = (id,start,end) => async (dispatch) => {
  try {
    //console.log('http://localhost:5050/api/review/getavg/review/${id}/${start}/${end}')
    const res = await axios.get(`${configData.SERVER_URL}/api/review/getavg/review/${id}/${start}/${end}`);
  console.log(res)
    dispatch({
      type: GET_REVIEW_AVG,
      payload: res.data,
    });
  } catch (err) {
    console.log(err)
    dispatch({
     type: GET_REVIEW_AVG_ERROR,
     payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//add review tag
export const addtag = (reviewvalue, id,rate) => async (dispatch) => {
    
  try {
    const res = await axios.post(`${configData.SERVER_URL}/api/review/reviewvalue/${id}/${rate}`, {reviewvalue});
 console.log(res)
    dispatch(setAlert('Review Tag Added ', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

  
  }
};

//add review
export const addreview = (review,comment,rate ,id) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  let description = review.toString();
  console.log(description)
  const body = JSON.stringify({
   rate,
   description,
   comment

  });
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.post(`${configData.SERVER_URL}/api/review/${id}/${60}`, body,config);
    console.log(res)
    dispatch(setAlert('Review Added Successfully! ', 'success') );
   
  } catch (err) {
    const errors = err.response.data.errors;
    
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

  
  }
};
