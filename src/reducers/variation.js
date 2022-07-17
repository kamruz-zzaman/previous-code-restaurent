import {
   GET_TYPES,
   GET_VARIATION,
   GET_VARIATION_ERROR,
   LINK_VARIATION,LINK_VARIATION_ERROR, UPDATE_VARIATION_ERROR,
   UPDATE_VARIATION,
   VARIATION_COUNT_ERROR,
   VARIATION_COUNT
   } from '../actions/types';
   
   const initialState = {
     variation: null,
     variations: [],
     variations_count: [],
     loading_count:true,
     loadingvariations: true,
     linkvariations:[],
     loadinglinkvariations:true,
     loading:true,
     update: false, 
     error: {},
   };
  
   // all variations reducers 
   export default function (state = initialState, action) {
     const { type, payload } = action;
   
     switch (type) {
  
         case GET_TYPES:
         case GET_VARIATION:
            return {
              ...state,
              variations: payload,
              loadingvariations: false,
              loading:false,
              update:false
            };
          case VARIATION_COUNT:
            return {
              ...state,
              variations_count: payload,
              loading_count: false,
            
            };
            case LINK_VARIATION:
              return {
                ...state,
                linkvariations: payload,
                loadinglinkvariations: false,
                update:false
            
              };
              case UPDATE_VARIATION:
                return {
                  ...state,
                 update: true
              
                };
          case VARIATION_COUNT_ERROR:
          case UPDATE_VARIATION_ERROR:
          case LINK_VARIATION_ERROR:
          case GET_VARIATION_ERROR:
            return {
              ...state,
              error: payload,
              loadingvariations: true,
              loading:true,
              update: false
            };
       default:
         return state;
     }
   }