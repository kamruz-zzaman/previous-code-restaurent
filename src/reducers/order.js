import {
    GET_ORDERLIST,
    GET_ORDERLIST_ERROR,
    GET_TODAYS_ORDERS_ERROR,
    GET_CUSTOMER_FAV_ORDER,
    GET_CUSTOMER_FAV_ORDER_ERROR,
    GET_TODAYS_ORDERS
   } from '../actions/types';
   
   const initialState = {
    order: null,
     orders: [],
     orderslist:[],
     favorderlist:[],
     loadingfavorder:true,
     loadingorderslist:true,
     loading: true,
     error: {},
     Neworder: false
   };
   
   //order reducers
   export default function (state = initialState, action) {
     const { type, payload } = action;
     let orderlist = state.orders;
     switch (type) {
       
     case GET_ORDERLIST:
       return {
         ...state,
         Neworder: orderlist.length>1 ?(payload.length>orderlist.length?(true):(false)):(false),
         orders: payload,
         loading: false,

       };
       
       case GET_TODAYS_ORDERS:
        return {
          ...state,
          orderslist: payload,
          loadingorderslist: false,
        };

        case GET_CUSTOMER_FAV_ORDER:
        return {
          ...state,
          favorderlist: payload,
          loadingfavorder: false,
        };
       
     case GET_CUSTOMER_FAV_ORDER_ERROR:   
     case GET_ORDERLIST_ERROR:
       return {
         ...state,
         error: payload,
         loading: false,
         loadingorderslist: false,
         loadingfavorder:true
         
       };
     
       default:
         return state;
     }
   }