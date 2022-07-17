import { SET_ALERT, REMOVE_ALERT, SET_ALERT_POP } from '../actions/types';

//alert reducers
const initialState = [];
export default function (state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case SET_ALERT:
      return [...state, payload];
    case SET_ALERT_POP:
     return [...state, payload];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
}
