import axios from 'axios';
import { setAlert } from './alert';
import { popupsetAlert } from './popupAlert';
import setAuthToken from '../utils/setAuthToken';
import configData from "../config.json";
import { addreview } from './review';
import {
  REGISTER_SUCCESS,
  REGISTER_FAILD,
  RESTSURANT_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAILD,
  LOGOUT,
  PIN_VARIFY_SUCCESS,
  PIN_VARIFY_FAILD,
  RESET_TOKEN_ERROR,
  RESET_TOKEN,
  RESET_PASS,
  RESET_PASS_ERROR

} from './types';

//Load Restuarant
export const loadRestuarant = () => async (dispatch) => {
  const config = {
    headers: {
      'Accept': 'application/json',
      "Authorization": `Bearer ${localStorage.token}`
    },
  };
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get(`${configData.SERVER_URL}/api/auth`, config);
    dispatch({
      type: RESTSURANT_LOADED,
      payload: res.data,
    });
    return
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};


//REgister User



export const register = ({
  first_Name,
  last_Name,
  email,
  phone,
  password,
}) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({
    first_Name,
    last_Name,
    email,
    phone,
    password,
  });

  try {
    const res = await axios.post(`${configData.SERVER_URL}/api/owner`, body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    console.log(res.data);
    dispatch(loadRestuarant());
    dispatch(setAlert('Register Successfully Now add Restaurant', 'success'));

  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: REGISTER_FAILD,
    });
  }
};

export const registeruser = ({
  first_Name,
  email,
  phone,
  password,
  type
},
  review, rate, id) => async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({
      first_Name,
      email,
      phone,
      password,
      type,
    });

    try {
      const res = await axios.post(`${configData.SERVER_URL}/api/owner/user/registration`, body, config);
      dispatch(addreview(review, rate, id));
      dispatch(logout());
      console.log(res)
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      dispatch(loadRestuarant());
      setAlert('Review submitted successfully!', 'success');

    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
        type: REGISTER_FAILD,
      });
    }
  };


export const registeguestruser = ({
  first_Name,
  email,
  phone,
  password,
  type
},
  review, rate, id) => async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({
      first_Name,
      email,
      phone,
      password,
      type,
    });

    try {
      const res = await axios.post(`${configData.SERVER_URL}/api/owner/guestuserregister`, body, config);
      dispatch(addreview(review, rate, id));
      dispatch(logout());
      console.log(res)
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      dispatch(loadRestuarant());
      setAlert('Review submitted successfully!', 'success');

    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
        type: REGISTER_FAILD,
      });
    }
  };

//add staff
export const addstaff = ({
  first_Name,
  email,
  phone,
  password,
  type,
}) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({
    first_Name,
    email,
    phone,
    password,
    type,
  });

  try {
    const res = await axios.post(`http://localhost:5050/api/owner/staffregister/9`, body, config);


    dispatch(setAlert('Staff added successfully!', 'success'));

  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }


  }
};

// add owner by admin
export const addowner = ({
  first_Name,
  last_Name,
  email,
  phone,
  password,
}) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({
    first_Name,
    last_Name,
    email,
    phone,
    password,
  });

  try {
    await axios.post(`${configData.SERVER_URL}/api/owner`, body, config);

    dispatch(setAlert('Owner Added', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }


  }
};



//LOgin user
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post(`${configData.SERVER_URL}/api/auth`, body, config);
    console.log(res.data);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadRestuarant());


  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(
        setAlert(error.msg, 'danger')));

    }

    dispatch({
      type: LOGIN_FAILD,
    });
  }
};
//LOgin user
export const loginuser = (email, password, review, rate, id) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post(`${configData.SERVER_URL}/api/auth`, body, config);
    dispatch(addreview(review, rate, id));
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadRestuarant());


  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));

    }

    dispatch({
      type: LOGIN_FAILD,
    });
  }
};

//verify pin and delete
export const varifypin = (pin, orderID) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  console.log(pin)
  const body = JSON.stringify({ pin });
  try {
    const res = await axios.post(`${configData.SERVER_URL}/api/auth/checkpin/6`, body, config);
    await axios.delete(`${configData.SERVER_URL}/api/order/${orderID}`);

    dispatch(setAlert('Order Deleted', 'success'))
    dispatch({
      type: PIN_VARIFY_SUCCESS,
      payload: res.data
    });




  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(popupsetAlert(error.msg, 'danger')));

    }

    dispatch({
      type: PIN_VARIFY_FAILD,
    });
  }
};


//forget passwoord user
export const forgotpassword = (email) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ email });
  try {
    const res = await axios.post(`${configData.SERVER_URL}/api/forgetpassword`, body, config);
    // console.log(res)
    // dispatch(setAlert('A Link is send to your Email address to reset password', 'success'))
    dispatch({
      type: RESET_TOKEN,
      payload: res.data
    });


  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));

    }
    dispatch({
      type: RESET_TOKEN_ERROR,
    });

  }
};

//forget passwoord user
export const Resetpassword = (formData, token) => async (dispatch) => {



  try {
    const res = await axios.patch(`${configData.SERVER_URL}/api/forgetpassword/reset/${token}`, formData);
    console.log(res)
    dispatch(setAlert('Password Saved', 'success'))



  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));

    }


  }
};

//forget passwoord user
export const changepassword = (formData, id) => async (dispatch) => {



  try {
    const res = await axios.patch(`${configData.SERVER_URL}/api/forgetpassword/changepassword/${id}`, formData);
    console.log(res)
    dispatch(setAlert('Password Saved', 'success'))

    dispatch({
      type: RESET_PASS,
      payload: res.data
    });

  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));

    }
    dispatch({
      type: RESET_PASS_ERROR,
    });

  }

};

export const logout = () => ({ type: LOGOUT });