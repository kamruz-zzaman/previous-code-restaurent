import axios from 'axios';
import { setAlert } from './alert';
import {ADD_PRODUCT,EMPTY_CART_ORDER,EMPTY_CART_ORDER_ERROR,ADD_PRODUCT_ERROR,SET_FAV_DISH,SET_FAV_DISH_ERROR ,ORDER, REMOVE_PRODUCT, REMOVE_PRODUCT_ERROR, UPDATE_PRODUCT,UPDATE_PRODUCT_ERROR,UPDATE_PRODUCT_M, UPDATE_PRODUCT_M_ERROR} from './types';
import configData from "../config.json";


//add product
export const addproduct = (products, price ,count, variation) => async (dispatch) => {

 if(variation){ variation.pop()}
  products.Qty=count  
  products.Dish_Price=price
  console.log(price)
  console.log(variation)
  products.variation=variation
  products.Key=  Math.floor((Math.random() * 100) + 1);
  console.log(products.Key)
  try {
    
    dispatch({
      type: ADD_PRODUCT,
      payload: products,
    });
   // dispatch(setAlert('Dish Added ', 'success'));
  } catch (err) {
    
      dispatch(setAlert('somthing went wrong', 'danger'));
     dispatch({
      type: ADD_PRODUCT_ERROR,
    });
  }
};



//user deal
export const adduserdealproduct = (products, price ,count, variation,dish) => async (dispatch) => {

  if(variation){ variation.pop()}
  //sort selected variations according to theri dish in string
  console.log("dish of deal")
  console.log(dish)
  var str = '';
  for(let i=0;i<dish.length;i++)
  { str+=`${dish[i].Dish_Name} : `
    for(let j=0;j<variation.length;j++)
    {
      if(dish[i].Dish_Name===variation[j].Dish_Name)
      {
        str += `${variation[j].variation_Name.toString()}, `;
      }
    }
    str +='. '

  } 


   products.Qty=count  
   products.Dish_Price=price
   products.variation=str
   products.Key=  Math.floor((Math.random() * 100) + 1);
   try {
     
     dispatch({
       type: ADD_PRODUCT,
       payload: products,
     });
    // dispatch(setAlert('Dish Added ', 'success'));
   } catch (err) {
     
       dispatch(setAlert('somthing went wrong', 'danger'));
      dispatch({
       type: ADD_PRODUCT_ERROR,
     });
   }
 };

//add deal product
export const adddealproduct = (products, price ,count, variation) => async (dispatch) => {
  var str = '';
  console.log(variation)
  if(variation.length>0){ 
    let j=0;
    while(j<variation.length)
    {
      str+=`${variation[j].Name} ,`

      for(let i = 0; i < variation[j].variation.length; i++){
        str += `${variation[j].variation[i].variation_Name.toString()}, `;
      };

      j++
      str +='. '

    }
  }
console.log(str)
   products.Qty=count  
   products.Dish_Price=price
   console.log(price)
   products.variation=str
   products.Key=  Math.floor((Math.random() * 100) + 1);
   console.log(products.Key)
   try {
     
     dispatch({
       type: ADD_PRODUCT,
       payload: products,
     });
    // dispatch(setAlert('Dish Added ', 'success'));
   } catch (err) {
     
       dispatch(setAlert('somthing went wrong', 'danger'));
      dispatch({
       type: ADD_PRODUCT_ERROR,
     });
   }
 };

export const addproducttoedit = (products) => async (dispatch) => {
  console.log("Hello");

   console.log(products)
   try {
     
     dispatch({
       type: ADD_PRODUCT,
       payload: products,
     });
    // dispatch(setAlert('Dish Added ', 'success'));
   } catch (err) {
       dispatch(setAlert('somthing went wrong', 'danger'));
      dispatch({
       type: ADD_PRODUCT_ERROR,
     });
   }
 };

//set fav dish ID
 export const openfavdish = (id) => async (dispatch) => {

   try {
     
     dispatch({
       type: SET_FAV_DISH,
       payload: id,
     });
    // dispatch(setAlert('Dish Added ', 'success'));
   } catch (err) {
       dispatch(setAlert('somthing went wrong', 'danger'));
      dispatch({
       type: SET_FAV_DISH_ERROR,
     });
   }
 };

 export const setfavdish = () => async (dispatch) => {

  try {
    
    dispatch({
      type: SET_FAV_DISH_ERROR,
      
    });
   // dispatch(setAlert('Dish Added ', 'success'));
  } catch (err) {
      dispatch(setAlert('somthing went wrong', 'danger'));
     dispatch({
      type: SET_FAV_DISH_ERROR,
    });
  }
};
//remove item from a cart

export const removecart = (products) => async (dispatch) => {
   
  try {
    
    dispatch({
      type: REMOVE_PRODUCT,
      payload: products,
    });
    
  } catch (err) {
      dispatch(setAlert('somthing went wrong', 'danger'));
     dispatch({
      type: REMOVE_PRODUCT_ERROR,
    });
  }
};

//update item from a cart at add

export const updatecartadd = (products) => async (dispatch) => {

  
 try {
   
   dispatch({
     type: UPDATE_PRODUCT,
     payload: products
   });
   
 } catch (err) {
   console.log(err)
     dispatch(setAlert('somthing went wrong', 'danger'));
    dispatch({
     type: UPDATE_PRODUCT_ERROR,
   });
 }
};


//update a cart at minus
export const updatecartminus = (products) => async (dispatch) => {

  
  try {
    
    dispatch({
      type: UPDATE_PRODUCT_M,
      payload: products
    });
    
  } catch (err) {
    console.log(err)
      dispatch(setAlert('somthing went wrong', 'danger'));
     dispatch({
      type: UPDATE_PRODUCT_M_ERROR,
    });
  }
 };

//place order
export const addorder = (dishes,amount,restaurant_Id,owner_id,{Name, Remarks, tableid,Type,userid,phone,address}) => async (dispatch) => {

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
console.log('Hello API')

  const body = {
    amount,
    Name, 
    Remarks, 
    tableid,
    Type,
    userid,
    phone,
    address
  };

var data=[]
data.push({
  dishes:dishes,
  orderdetails:body
})
  try {
    //send oreder details to the API
    const res = await  axios.post(`http://localhost:5050/api/order/${restaurant_Id}/${owner_id}`,{data},
    config);
    console.log(res)
    let orderID=res.data.data;
    var d = new Date()
    let message =  `Received a new Order, Order Id:${orderID}, Date: ${d}.`
    const bodyy = JSON.stringify({ message});
  // add notification 
    const ress = await axios.post(`${configData.SERVER_URL}/api/notification/5/${orderID}`, bodyy, config);
    //console.log(ress)
    dispatch({
      type: ORDER,
      
    });
    //emptycartorder()
    dispatch(setAlert('Order Placed ', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(errors)
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
  
   
  }
  };

  export const addorderbyuser = (dishes,amount,restaurant_Id,{Name, Remarks}) => async (dispatch) => {

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  console.log('Hello API')
  
    const body = {
      amount,
      Name, 
      Remarks, 
    
    };
  
  var data=[]
  data.push({
    dishes:dishes,
    orderdetails:body
  })
    try {
      //send oreder details to the API
      const res = await  axios.post(`http://localhost:5050/api/order/${restaurant_Id}`,{data},
      config);
      console.log(res)
      let orderID=res.data.data;
      var d = new Date()
      let message =  `Received a new Order, Order Id:${orderID}, Date: ${d}.`
      const bodyy = JSON.stringify({ message});
    // add notification 
     // const ress = await axios.post(`http://localhost:5050/api/notification/${restaurant_Id}/${orderID}`, bodyy, config);
     // console.log(ress)
      dispatch({
        type: ORDER,
        
      });
     //emptycartorder()
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
export const editorderO = (dishes,amount,order_Id,Remarks,tableid) => async (dispatch) => {

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = {
    amount,
   Remarks,
   tableid,
  };

  console.log(tableid)
  var data=[]
  data.push({
    dishes:dishes,
    orderdetails:body
  })
  try {
    //send oreder details to the API
    const res = await  axios.patch(`${configData.SERVER_URL}/api/order/edit/order/${order_Id}`,{data},
    config);
    console.log(res)


    dispatch({
      type: ORDER,
      
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

  export const completeOrder = (order_Id) => async (dispatch) => {

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    try {
      //send oreder details to the API
      const res = await  axios.patch(`${configData.SERVER_URL}/api/order/${order_Id}`,
      config);
     
     dispatch({
       type: ORDER,
        
      });
    //  emptycartorder()
      dispatch(setAlert('Order Completed ', 'success'));
    } catch (err) {
      const errors = err.response.data.errors;
      console.log(errors)
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }
    
     
    }
    };

    export const emptycartorder = () => async (dispatch) => {

  
      try {
        
        dispatch({
          type: EMPTY_CART_ORDER,
          
        });
        
      } catch (err) {
        console.log(err)
          dispatch(setAlert('somthing went wrong', 'danger'));
         dispatch({
          type: EMPTY_CART_ORDER_ERROR,
        });
      }
     };
