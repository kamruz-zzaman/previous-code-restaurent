import {
    GET_TABLES,
    GET_TABLES_ERROR
    } from '../actions/types';
    
    const initialState = {
     table: null,
      tables: [],
      loading: true,
      error: {},
    };
    
    // reducers for showing restaurant in admin dashboard 
    export default function (state = initialState, action) {
      const { type, payload } = action;
    
      switch (type) {
        
      case GET_TABLES:
        return {
          ...state,
          tables: payload,
          loading: false,
        };
 
       
    
      case GET_TABLES_ERROR:
        return {
          ...state,
          error: payload,
          adminrestaurant: null,
          loading: false,
        };
 
        
      
        default:
          return state;
      }
    }