import {
    GET_RESTUARANT,
    GET_RESTUARANT_ERROR,
    EDIT_RESTUARANT,
    EDIT_RESTUARANT_ERROR,
    GET_ALL_RESTUARANT,
    GET_ALL_RESTUARANT_ERROR
   } from '../actions/types';
   
   const initialState = {
    restuarant: null,
     restuarants: [],
     loading: true,
     loading2: true,
     error: {},
   };
   
   // restaurant reducers 
   export default function (state = initialState, action) {
     const { type, payload } = action;
   
     switch (type) {
        case EDIT_RESTUARANT:
            return { ...state, restuarant: payload, loading: false };
     case GET_RESTUARANT:
       return {
         ...state,
         restuarant: payload,
         loading: false,
         loading2:false
       };

       case GET_ALL_RESTUARANT:
        return {
          ...state,
          restuarants: payload,
          loading: false,
        };

      case GET_ALL_RESTUARANT_ERROR:
     case EDIT_RESTUARANT_ERROR:
     case GET_RESTUARANT_ERROR:
       return {
         ...state,
         error: payload,
         loading: false,
         loading2:false
       };

       
     
       default:
         return state;
     }
   }