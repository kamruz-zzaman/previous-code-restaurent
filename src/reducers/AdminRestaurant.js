import {
   GET_RESTUARANT_BY_ADMIN,
   GET_RESTUARANT_BY_ADMIN_ERROR
   } from '../actions/types';
   
   const initialState = {
    adminrestaurant: null,
     adminrestaurants: [],
     loading: true,
     loading2: true,
     error: {},
   };
   
   // reducers for showing restaurant in admin dashboard 
   export default function (state = initialState, action) {
     const { type, payload } = action;
   
     switch (type) {
       
     case GET_RESTUARANT_BY_ADMIN:
       return {
         ...state,
         adminrestaurant: payload,
         loading2: false,
       };

      
   
     case GET_RESTUARANT_BY_ADMIN_ERROR :
       return {
         ...state,
         error: payload,
         adminrestaurant: null,
         loading2: false,
       };

       
     
       default:
         return state;
     }
   }