import {
    GET_ADMIN,
    GET_ADMIN_ERROR,
    GET_OWNER,
    GET_OWNER_ERROR,
    GET_USER_ERROR,
    GET_USER
   } from '../actions/types';
   
   const initialState = {
    owner: null,
     owners: [],
     loading: true,
     loading2: true,
     error: {},
   };
   
   //owner reducers
   export default function (state = initialState, action) {
     const { type, payload } = action;
   
     switch (type) {
       
     case GET_ADMIN:
       return {
         ...state,
         owner: payload,
         loading: false,
       };

       case GET_OWNER:
       return {
         ...state,
         owners: payload,
         loading2: false,
       };

       case GET_USER:
        return {
          ...state,
          owner: payload,
          loading2: false,
        };
     
     case GET_USER_ERROR:   
     case GET_OWNER_ERROR:
     case GET_ADMIN_ERROR:
       return {
         ...state,
         error: payload,
         loading: false,
         loading2: false,
       };
     
       default:
         return state;
     }
   }