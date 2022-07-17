import axios from 'axios';
import { setAlert } from './alert';
import configData from "../config.json";
import {ADD_PRODUCT_DEAL,ADD_PRODUCT_DEAL_ERROR, ORDER_DEAL, REMOVE_PRODUCT_DEAL,EMPTY_CART,EMPTY_CART_ERROR ,REMOVE_PRODUCT_DEAL_ERROR, UPDATE_PRODUCT_DEAL,UPDATE_PRODUCT_DEAL_ERROR,UPDATE_PRODUCT_DEAL_M, UPDATE_PRODUCT_DEAL_M_ERROR} from './types';



//add product
export const addproduct = (products, price ,count, variation,Name) => async (dispatch) => {

 if(variation){ variation.pop()}
  
  products.variation=variation
  products.Key=  Math.floor((Math.random() * 100) + 1);
products.Name=Name
  try {
    
    dispatch({
      type: ADD_PRODUCT_DEAL,
      payload: products,
    });
   // dispatch(setAlert('Dish Added ', 'success'));
  } catch (err) {
    
      dispatch(setAlert('somthing went wrong', 'danger'));
     dispatch({
      type: ADD_PRODUCT_DEAL_ERROR,
    });
  }
};

export const addproducttoedit = (products) => async (dispatch) => {
  console.log("Hello");

   console.log(products)
   try {
     
     dispatch({
       type: ADD_PRODUCT_DEAL,
       payload: products,
     });
    // dispatch(setAlert('Dish Added ', 'success'));
   } catch (err) {
       dispatch(setAlert('somthing went wrong', 'danger'));
      dispatch({
       type: ADD_PRODUCT_DEAL_ERROR,
     });
   }
 };

//remove item from a cart

export const removecart = (products) => async (dispatch) => {
   
  try {
    
    dispatch({
      type: REMOVE_PRODUCT_DEAL,
      payload: products,
    });
    
  } catch (err) {
      dispatch(setAlert('somthing went wrong', 'danger'));
     dispatch({
      type: REMOVE_PRODUCT_DEAL_ERROR,
    });
  }
};

//update item from a cart at add

export const updatecartadd = (products) => async (dispatch) => {

  
 try {
   
   dispatch({
     type: UPDATE_PRODUCT_DEAL,
     payload: products
   });
   
 } catch (err) {
   console.log(err)
     dispatch(setAlert('somthing went wrong', 'danger'));
    dispatch({
     type: UPDATE_PRODUCT_DEAL_ERROR,
   });
 }
};


//update a cart at minus
export const updatecartminus = (products) => async (dispatch) => {

  
  try {
    
    dispatch({
      type: UPDATE_PRODUCT_DEAL_M,
      payload: products
    });
    
  } catch (err) {
    console.log(err)
      dispatch(setAlert('somthing went wrong', 'danger'));
     dispatch({
      type: UPDATE_PRODUCT_DEAL_M_ERROR,
    });
  }
 };

 export const emptycart = () => async (dispatch) => {

  
  try {
    
    dispatch({
      type: EMPTY_CART,
      
    });
    
  } catch (err) {
    console.log(err)
      dispatch(setAlert('somthing went wrong', 'danger'));
     dispatch({
      type: EMPTY_CART_ERROR,
    });
  }
 };

//place order
export const addorder = (dishes,amount,restaurant_Id,{Customer_Name, Remarks, table_number}) => async (dispatch) => {

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
console.log('Hello API')

  const body = JSON.stringify({
    amount,
    Customer_Name, 
    Remarks, 
    table_number
  });
console.log(body)

  try {
    //send oreder details to the API
    const res = await  axios.post(`${configData.SERVER_URL}/api/order/${restaurant_Id}`,{dishes}, body,
    config);
    console.log(res)
    let orderID=88
    var d = new Date()
    let message =  `Received a new Order, Order Id:${orderID}, Date: ${d}.`
    const bodyy = JSON.stringify({ message});
  // add notification 
    const ress = await axios.post(`${configData.SERVER_URL}/api/notification/5/${orderID}`, bodyy, config);
    console.log(ress)
    dispatch({
      type: ORDER_DEAL,
      
    });
    dispatch(setAlert('Order Placed ', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(errors)
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
  
   
  }
  };

  //edit order
export const editorderO = (dishes,amount,order_Id,Remarks) => async (dispatch) => {

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
console.log(amount)


 
console.log(dishes,order_Id)

  try {
    //send oreder details to the API
    const res = await  axios.patch(`${configData.SERVER_URL}/api/order/${order_Id}/${amount}/${Remarks}`,{dishes},
    config);
    console.log(res)
    dispatch({
      type: ORDER_DEAL,
      
    });
    dispatch(setAlert('Changes Saved ', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(errors)
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
  
   
  }
  };
