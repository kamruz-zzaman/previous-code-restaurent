import {
    ADD_DISH,
    ADD_DISH_ERROR,
    GET_DISHES,
    GET_DISHES_ERROR,
    UPDATE_DISH,
    UPLOAD_DISH_IMAGE,
    UPLOAD_DISH_IMAGE_ERROR
    
   } from '../actions/types';
   
   const initialState = {
     dish: null,
     dishes: [],
     loading: true,
     error: {},
     update: false,
   };
   
   //dishes reducers 
   export default function (state = initialState, action) {
     const { type, payload } = action;
   
     switch (type) {
       case UPLOAD_DISH_IMAGE:
     case ADD_DISH:
       return { ...state, dish: payload, loading: false,  update:true };
  
       case UPLOAD_DISH_IMAGE_ERROR:
      case ADD_DISH_ERROR:
         return {
           ...state,
           error: payload,
           loading: false,
          
         };
      case UPDATE_DISH:
          return{
            ...state,
            update:true,
          }
         case GET_DISHES:
            return {
              ...state,
              dishes: payload,
              loading: false,
              update: false
            };
          
          case GET_DISHES_ERROR:
            return {
              ...state,
              error: payload,
              loading: false,
              update:false
            };
       default:
         return state;
     }
   }