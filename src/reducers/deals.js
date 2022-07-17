import {
    GET_DEALS_ERROR,
    GET_DEALS,
    GET_USER_DEALS_ERROR,
    GET_USER_DEALS
    
   } from '../actions/types';
   
   const initialState = {
     deal: null,
     deals: [],
     Userdeals:[],
     loading: true,
     uloading: true,
     error: {},
   };
   
   //deales reducers 
   export default function (state = initialState, action) {
     const { type, payload } = action;

     switch (type) {
  

         case GET_DEALS:
            return {
              ...state,
             deals: payload,
              loading: false,
            };

          case GET_USER_DEALS:
      
            return{
              ...state,
              Userdeals: payload,
               uloading: false,
              
            }


          case GET_USER_DEALS_ERROR:
          case GET_DEALS_ERROR:
            return {
              ...state,
              error: payload,
              loading: false,
              uloading: false,
            };
       default:
         return state;
     }
   }