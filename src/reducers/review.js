import {
   GET_REVIEW_TAGS,
   GET_REVIEW_TAGS_ERROR,
   GET_REVIEW_TAGS_EDIT,
   GET_REVIEW_TAGS_EDIT_ERROR,
   GET_REVIEW_AVG,
   GET_REVIEW_AVG_ERROR,
   GET_REVIEW_ALL,
   GET_REVIEW_ALL_ERROR,
   GET_REVIEW_CUSTOMER,
   GET_REVIEW_CUSTOMER_ERROR
   } from '../actions/types';
   
   const initialState = {
     review: null,
     reviews: null,
     reviewavg: [],
     customerreview: [],
     loadingcustomerreview:true,
     reviewtag:null,
     loading: true,
     loading2:true,
     loading3: true,
     error: {},
   };
   
   // restaurant reducers 
   export default function (state = initialState, action) {
     const { type, payload } = action;
   
        switch (type) {
        case GET_REVIEW_TAGS:
        return { ...state,
        review: payload, 
        loading: false };

        case GET_REVIEW_ALL:
          return { ...state,
          reviews: payload, 
          loading2: false };

          case GET_REVIEW_CUSTOMER:
            return { ...state,
            customerreview: payload, 
            loadingcustomerreview: false };

       case GET_REVIEW_AVG:
       return { ...state,
        reviewavg: payload, 
        loading3: false };

        case GET_REVIEW_TAGS:
        return { ...state,
        review: payload, 
        loading: false };


          case GET_REVIEW_TAGS_EDIT:
          return { ...state,
          reviewtag: payload, 
          loading2: false };

     case GET_REVIEW_ALL_ERROR:
     case GET_REVIEW_AVG_ERROR:
     case GET_REVIEW_TAGS_EDIT_ERROR:
     case GET_REVIEW_TAGS_ERROR:
     case GET_REVIEW_CUSTOMER_ERROR:
       return {
         ...state,
         error: payload,
         loading: false,
         loadingcustomerreview:false,
         loading2:false,
         loading3:false,
       };

       
     
       default:
         return state;
     }
   }