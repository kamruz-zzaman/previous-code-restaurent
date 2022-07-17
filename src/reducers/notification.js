import { GET_NOTIFICATION, GET_NOTIFICATION_ERROR } from '../actions/types';

const initialState = {
  notification: null,
  notifications: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_NOTIFICATION:
      return {
        ...state,
        notifications: payload,
        loading: false,
      };

    case GET_NOTIFICATION_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
}