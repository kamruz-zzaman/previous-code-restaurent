import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import menus from './menu';
import dishes from './dish'
import ALL_dishes from './Alldishes'
import restuarants from './restaurant'
import owners from './owner'
import adminrestaurants from './AdminRestaurant'
import variations from './variation'
import products from './shoopingcart'
import orders from './order'
import notifications from './notification'
import tables from './tables'
import vieworders from './vieworder'
import deals from './deals'
import dealscart from './dealscart'
import review from './review';
import popupalerts from './popupalert';
// combine reducers to show in redux store 
export default combineReducers({
    alert,
    popupalerts,
    menus,
    auth,
    dishes,
    ALL_dishes,
    restuarants,
    owners,
    adminrestaurants,
    variations,
    products,
    orders,
    notifications,
    vieworders,
    tables,
    deals,
    dealscart,
    review
   
});
