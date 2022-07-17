import {
   ADD_MENU,
   ADD_MENU_ERROR,
   GET_MENU,
   GET_MENU_ERROR,
   EDIT_MENU,
   EDIT_MENU_ERROR,
   UPDATE_MENU_ERROR,
   UPDATE_MENU
  } from '../actions/types';
  
  const initialState = {
    menu: null,
    menus: [],
    loading: true,
    error: {},
    update: false,
  };
  
  // menu reducers
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
    case EDIT_MENU:  
    case ADD_MENU:
      return {
        ...state,
        menu: payload,
        loading: false,
        update: true 
      };
      case UPDATE_MENU:
      return {
        ...state,
        update: true 
      };

    case GET_MENU:
      return {
        ...state,
        menus: payload,
        loading: false,
        update: false
      };
    
    case GET_MENU_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
     case UPDATE_MENU_ERROR:
     case EDIT_MENU_ERROR:
     case ADD_MENU_ERROR:
        return {
          ...state,
          error: payload,
          loading: false,
          update: false
        };
      default:
        return state;
    }
  }
  