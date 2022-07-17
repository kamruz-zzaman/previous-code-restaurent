import {
    GET_VIEWORDER,
    GET_VIEWORDER_ERROR,
    PIN_VARIFY_SUCCESS,
    PIN_VARIFY_FAILD
   } from '../actions/types';
   
   const initialState = {
    vieworder: null,
     vieworders: [],
     loading: true,
     popup:true,
     error: {},
   };
   
   //vieworder reducers
   export default function (state = initialState, action) {
     const { type, payload } = action;
   
     switch (type) {
       
     case GET_VIEWORDER:
       return {
         ...state,
         vieworders: payload,
         loading: false,
       };

       case PIN_VARIFY_SUCCESS:
         return{
           ...state,
           popup: false
         }
     case GET_VIEWORDER_ERROR:
       return {
         ...state,
         error: payload,
         loading: false,
         
       };
     
       default:
         return state;
     }
   }