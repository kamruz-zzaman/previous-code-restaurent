import axios from 'axios';
import { setAlert } from './alert';
import {GET_ORDERLIST,GET_CUSTOMER_FAV_ORDER,GET_CUSTOMER_FAV_ORDER_ERROR ,EDIT_ORDER,GET_TODAYS_ORDERS, GET_TODAYS_ORDERS_ERROR,GET_ORDERLIST_ERROR, GET_VIEWORDER, GET_VIEWORDER_ERROR} from './types';
import configData from "../config.json";


//Get order by menu ID
export const getorder = () => async (dispatch) => {
    try {
      const res = await axios.get(`${configData.SERVER_URL}/api/order/All/order`);
    
      dispatch({
        type: GET_ORDERLIST,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
       type: GET_ORDERLIST_ERROR,
       payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

  export const getfavorder = (id) => async (dispatch) => {
    try {
      const res = await axios.get(`${configData.SERVER_URL}/api/order/getorderby/customerid/${id}`);
    
      dispatch({
        type: GET_CUSTOMER_FAV_ORDER,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
       type: GET_CUSTOMER_FAV_ORDER_ERROR,
       payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };


  //GET todays pending order list
  export const getordertodays = () => async (dispatch) => {
    try {
      const res = await axios.get(`${configData.SERVER_URL}/api/order/orderlist/today/pending`);
    
      dispatch({
        type: GET_TODAYS_ORDERS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
       type: GET_TODAYS_ORDERS_ERROR,
       payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

  //Get order by order ID
export const vieworder = (id) => async (dispatch) => {
  try {
    console.log('hello action')
    const res = await axios.get(`${configData.SERVER_URL}/api/order/${id}`);
  console.log(res)
    dispatch({
      type: GET_VIEWORDER,
      payload: res.data,
    });
    
  } catch (err) {
    dispatch({
     type: GET_VIEWORDER_ERROR,
     payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};


  //Get order report by admin 
export const getorderreport = (startdate,enddate,min,valuee,status) => async (dispatch) => {
  try {
    console.log('Hello api1')
    console.log(startdate,enddate)

    console.log(valuee)
    console.log(status)
    const sel = JSON.stringify(startdate);
    console.log(sel)
    const res = await axios.get(`${configData.SERVER_URL}/api/order/oderreporting/${min}/${valuee}/${startdate}/${enddate}/${status}`);
  
    console.log(res)
    dispatch({
      type: GET_ORDERLIST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
     type: GET_ORDERLIST_ERROR,
     payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};


//get pending order
export const getallorder = (id) => async (dispatch) => {
  try {
    
    const res = await axios.get(`${configData.SERVER_URL}/api/order/All/pending/order/${id}`);
  
  
    dispatch({
      type: GET_ORDERLIST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
     type: GET_ORDERLIST_ERROR,
     payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//get order dishes
export const getorderdishes = (id) => async (dispatch) => {
  try {
    
    const res = await axios.get(`${configData.SERVER_URL}/api/order/${id}`);
  
console.log(res)
    dispatch({
      type: EDIT_ORDER,
      payload: res.data,
    });
    
  } catch (err) {
     
     console.log(err)
  }
};

 //Get order report by owner ID
 export const getorderreportbyowner = (startDate,endDate,valuee,id,status) => async (dispatch) => {
  try {
    console.log(startDate,endDate)

    console.log(valuee)
    console.log(status)
    const sel = JSON.stringify(startDate);
    console.log(sel)

    const res = await axios.get(`${configData.SERVER_URL}/api/order/oderreporting/${id}/0/${valuee}/${startDate}/${endDate}/${status}`);
  
 console.log(res)
    dispatch({
   type: GET_ORDERLIST,
    payload: res.data,
   });
  } catch (err) {
    dispatch({
     type: GET_ORDERLIST_ERROR,
     payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

  

  //update status
export const setstatus = (status, id, ) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  

  const body = JSON.stringify({
    status,
  });
  //const boid = JSON.stringify({
   // id,
  //});

  
  try {
    const res = await axios.patch(
      `${configData.SERVER_URL}/api/order/updatestatus/${id}`,
      body,
      config
    );
    console.log(res)
   
    dispatch(setAlert(`order ${status}`, 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

   
  }
};