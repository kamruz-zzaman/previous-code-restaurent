import {
    ALL_DISHES,
    ALL_DISHES_ERROR
   } from '../actions/types';
   
   const initialState = {
     ALL_dish: null,
     ALL_dishes: [],
     loadingdishes: true,
     error: {},
   };
   
   // all dishes reducers 
   export default function (state = initialState, action) {
     const { type, payload } = action;
   
     switch (type) {
  
      
         case ALL_DISHES:
            return {
              ...state,
              ALL_dishes: payload,
              loadingdishes: false,
            };
          
          case ALL_DISHES_ERROR:
            return {
              ...state,
              error: payload,
              loadingdishes: false,
            };
       default:
         return state;
     }
   }