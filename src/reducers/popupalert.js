import { SET_ALERT_POPUP, REMOVE_ALERT_POPUP } from '../actions/types';

//alert reducers
const initialState = [];
export default function (state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case SET_ALERT_POPUP:
      return [...state, payload];
    case REMOVE_ALERT_POPUP:
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
}
