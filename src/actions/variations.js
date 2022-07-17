import axios from 'axios';
import { setAlert } from './alert';
import {GET_TYPES, GET_VARIATION, UPDATE_VARIATION, VARIATION_COUNT, VARIATION_COUNT_ERROR, UPDATE_VARIATION_ERROR ,GET_VARIATION_ERROR, LINK_VARIATION,LINK_VARIATION_ERROR} from './types';
import configData from "../config.json";




//get variation 

export const getvariation = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${configData.SERVER_URL}/api/variation/dish_variation/${id}`);

    dispatch({
      type: GET_VARIATION,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
     type: GET_VARIATION_ERROR,
     payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};



//add variation type
export const addvariationtype = (VarationType,id) => async (dispatch) => {
    
  try {
    const res = await axios.post(`${configData.SERVER_URL}/api/variation/variation_type/multiple/${id}`, {VarationType});
  
  dispatch({
    type: UPDATE_VARIATION
  });
    dispatch(setAlert('Variation Type added ', 'success'));
    window.location.reload(false)
  
  } catch (err) {
    const errors = err.response.data.errors;
    
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: UPDATE_VARIATION_ERROR
    });
   
  }
};

//add variation 
export const addvariation = (varation) => async (dispatch) => {
    
  try {
  
    const res = await axios.post(`${configData.SERVER_URL}/api/variation/multiple/varations`, {varation});
   
    await dispatch({
      type: UPDATE_VARIATION,  
      payload: res.data,
    });
    dispatch(setAlert('Variation Added ', 'success'));
    window.location.reload(false)
  } catch (err) {
    const errors = err.response.data.errors;
    
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: UPDATE_VARIATION_ERROR
    });
  }
};

//add variation 
export const Variationlink = (varation,id) => async (dispatch) => {
    
  try {
    const res = await axios.post(`${configData.SERVER_URL}/api/variation/multiple/dish_variation/${id}`, {varation});
  setAlert('Variation LInked', 'success');
  window.location.reload(false)
  } catch (err) {
    const errors = err.response.data.errors;
    
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

   
  }
};

export const gettype = (id) => async (dispatch) => {
    
  try {
    const res = await axios.get(`${configData.SERVER_URL}/api/variation/${id}/24`);

    dispatch({
      type: GET_TYPES,
      payload: res.data,
    });
   
  } catch (err) {
    const errors = err.response.data.errors;
    
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

   
  }
};

export const gettypecount = (id) => async (dispatch) => {
    console.log(`${configData.SERVER_URL}/api/variation/type/${id}`)
  try {
    const res = await axios.get(`${configData.SERVER_URL}/api/variation/type/count/${id}`);

    dispatch({
      type: VARIATION_COUNT,
      payload: res.data,
    });
   
  } catch (err) {
    dispatch({
      type: VARIATION_COUNT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
     });
   
  }
};

export const gettypelink = (id) => async (dispatch) => {
    console.log("hellooo")
  try {
    const res = await axios.get(`${configData.SERVER_URL}/api/variation/type/count/${id}`);

  await  dispatch({
      type: LINK_VARIATION,
      payload: res.data,
    });
   
  } catch (err) {
 
      dispatch({
        type: LINK_VARIATION_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
       });
    

   
  }
};

export const unlink = (id,did) => async (dispatch) => {
  console.log(`${configData.SERVER_URL}/api/variation/unlink/${id}/${did}`)
try {
  const res = await axios.delete(`${configData.SERVER_URL}/api/variation/unlink/${id}/${did}`);

window.location.reload(false)
 
} catch (err) {

   


 
}
};

export const Editsinglevariation = (Data, id) => async (dispatch) => {
 console.log(Data)
  try {
    const res = await axios.patch(`${configData.SERVER_URL}/api/variation`,Data);
     console.log("hello update vari api",res)
     dispatch({
      type: UPDATE_VARIATION,
      payload: res.data,
      
    });
    dispatch(setAlert('Changes Saved','success'));
    window.location.reload(false)
  } catch (err) {
    const errors = err.response.data.errors;
    
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: UPDATE_VARIATION_ERROR,
    });
   
  }
  };

  export const Editvariationtype = (Data, id) => async (dispatch) => {
    console.log(Data)
     try {
       const res = await axios.patch(`${configData.SERVER_URL}/api/variation/variationtype`,Data);
        console.log("hello update vari api",res)
        dispatch({
         type: UPDATE_VARIATION,
         payload: res.data,
         
       });
       dispatch(setAlert('Changes Saved','success'));
       window.location.reload(false)
     } catch (err) {
       const errors = err.response.data.errors;
       
       if (errors) {
         errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
       }
       dispatch({
         type: UPDATE_VARIATION_ERROR,
       });
      
     }
     };

