import {
  REGISTER_SUCCESS,
  REGISTER_FAILD,
  RESTSURANT_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAILD,
  RESET_TOKEN,
  RESET_TOKEN_ERROR,
  LOGOUT,
  RESET_PASS_ERROR,
  RESET_PASS

} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  resettoken: null,
  user: null,
  passwordupdated: false,
  loading2: true
};
//auth reducer

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case RESTSURANT_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: false,
        loading: false,
        user: payload,
      };
    case RESET_TOKEN:

      return {
        ...state,
        loading2: false,
        resettoken: null,
        resettoken: payload
      };

    case REGISTER_FAILD:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case RESET_PASS:

      return {

        passwordupdated: true
      };

    case RESET_PASS_ERROR:
    case RESET_TOKEN_ERROR:
    case LOGIN_FAILD:
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        loading2: false,
        passwordupdated: false
      };


    default:
      return state;
  }
}