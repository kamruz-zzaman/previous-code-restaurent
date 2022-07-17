import React, { Fragment, useEffect } from 'react';
import Addmenu from './componets/Menu/addmenu';
import MenuA from './componets/Menu/menu';
import Adddish from './componets/dishes/DishA';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import setAuthToken from './utils/setAuthToken';
import { loadRestuarant } from './actions/auth';
import { Provider } from 'react-redux';
import Register from './componets/auth/Registration';
import Addstaff from './componets/auth/addstaff';
import Updatepass from './componets/auth/changepass';
import GRegister from './componets/auth/guestRegistration';
import CRegister from './componets/auth/customerRegistration';
import resetpassword from './componets/auth/Resetpassword';
import forgotpassword from './componets/auth/forgotpassword';
import Login from './componets/auth/login';
import store from './store';
import Alerts from './componets/layout/Alert';
import Alerts2 from './componets/layout/popupalert2';
import Landing from './componets/layout/Landing';
import RestaurantLanding from './componets/layout/RestaurentLanding'
import Dashboard from './componets/dashbard'
import DashboardSub from './componets/dashboardsub'
import WDashboard from './componets/wdashboard'
import Alldishes from './componets/dishes/Alldishes'
import Menu from './componets/layout/Menu'
import UMenu from './componets/layout/Usermenu'
import Editmenu from './componets/Menu/Editmenu'
import Editdish from './componets/dishes/Editdishes'
import Editprofile from './componets/Restaurant/EditProfile'
import './App.css';
import './table.SCSS';
import ADDRestaurant from './componets/Restaurant/AddRestaurent'
import EditRestuarent from './componets/Restaurant/EditRestuarent';
import admindashboard from './componets/admindashboard';
import PrivateRoute from './componets/Routing/PrivateRouting';
import EditRestaurantbyAdmin from './componets/Restaurant/EditRestaurantbyAdmin';
import addownerbyadmin from './componets/Restaurant/Addownerbyadmin'
import addrestaurantbyowner from './componets/Restaurant/addrestaurantbyowner';
import Oderreporting from './componets/order/orderReport'
import Oderreportingbyowner from './componets/order/ownerordereport';
import Ownermenu from './componets/layout/OwnerMenuCopy';
import Ownermenud from './componets/layout/deliveryorder';
import OwnermenuT from './componets/layout/Takeoutorder';
import Header from './componets/layout/header';
import editorder from './componets/order/Editorder';
import Addvaration from './variations/Alllinkvaration'
import Addvarationtype from './variations/Allvariationtypes';
import LinkVariation from './variations/linkvariationform';
import Todayorderlist from './componets/order/Todayorderlist';
import Updateorder from './componets/order/orderstatusupdate';
import Adddeal from './componets/dishes/adddeal';
import Rating from './componets/layout/RatingStars'
import ReviewsU from './componets/layout/Showreview'
import Reviews from './componets/layout/showreview_owner';
import Reviewtag from './componets/layout/AddReviewtag'
import Menucopy from './componets/layout/Menucopy'
import Tabmenu from './componets/layout/Tabmenu'
import { Helmet } from 'react-helmet';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import SignUp from './Authentication/SignUp';
//set auth token from local storage to header 
if (localStorage.token) {
  setAuthToken(localStorage.token);
}
function App() {
  // get the Restaurant 
  useEffect(() => {

    store.dispatch(loadRestuarant());
  }, []);
  return (<div>
    <Helmet>
      <title>Restaurant</title>
    </Helmet>
    <Provider store={store}>
      <Router basename="/System">
        <Fragment>

          {/* <Header /> */}
          <PrivateRoute exact path='/dashboard/:id' component={Dashboard} />
          <PrivateRoute exact path='/dashboardS/:id' component={DashboardSub} />
          <PrivateRoute exact path='/wdashboard/:id' component={WDashboard} />
          <Route exact path='/menus/:url/:id' component={Menu} />
          <Route exact path='/usermenu/:url/:id' component={UMenu} />
          <Route exact path='/menuscopy/:url/:id' component={Menucopy} />
          <Route exact path='/' component={Landing} />
          <Route exact path='/login' component={Login} />
          <PrivateRoute exact path='/Restuarant/:url' component={RestaurantLanding} />
          <PrivateRoute exact path='/addstaff' component={Addstaff} />
          <PrivateRoute exact path='/addmenu/:id' component={MenuA} />
          <PrivateRoute exact path='/addmenu/:id/:rid' component={Addmenu} />
          <PrivateRoute exact path='/add-dish/:name/:rid/:id' component={Adddish} />
          <PrivateRoute exact path='/add-deal/:rid/:id' component={Adddeal} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/guestuserregister' component={GRegister} />
          <Route exact path='/customerregister' component={CRegister} />
          <PrivateRoute exact path='/editdish/:name/:rid/:id' component={Editdish} />
          <PrivateRoute exact path='/menu/:rid/:id' component={Alldishes} />
          <PrivateRoute exact path='/editorder/:id' component={editorder} />
          <PrivateRoute exact path='/editmenu/:id' component={Editmenu} />
          <PrivateRoute exact path='/addrestaurant/:id' component={ADDRestaurant} />
          <PrivateRoute exact path='/addrestaurantbyadmin/:id' component={addrestaurantbyowner} />
          <PrivateRoute exact path='/editrestaurant/:id' component={EditRestuarent} />
          <PrivateRoute exact path='/editrestaurant/byadmin/:rid/:id' component={EditRestaurantbyAdmin} />
          <PrivateRoute exact path='/addowner/:id' component={addownerbyadmin} />
          <PrivateRoute exact path='/admin/:id' component={admindashboard} />
          <PrivateRoute exact path='/resetpassword/:id' component={resetpassword} />
          <Route exact path='/forgotpassword' component={forgotpassword} />
          <Route exact path='/order-report' component={Oderreporting} />
          <Route exact path='/order-report/:id' component={Oderreportingbyowner} />
          <Route exact path='/RestuarantMenu/:id/:rid' component={Ownermenu} />
          <Route exact path='/RestuarantMenuT/:id/:rid' component={OwnermenuT} />
          <Route exact path='/RestuarantMenuD/:id/:rid' component={Ownermenud} />
          <Route exact path='/EditProfile/:id' component={Editprofile} />
          <Route exact path='/AddVariation/:id/:name/:rid' component={Addvaration} />
          <Route exact path='/AddVariationtype/:id' component={Addvarationtype} />
          <Route exact path='/AddReviewtag/:rid' component={Reviewtag} />
          <Route exact path='/linkvariation/:id' component={LinkVariation} />
          <Route exact path='/Todayorderlist/:id' component={Todayorderlist} />
          <Route exact path='/updateorderlist' component={Updateorder} />
          <Route exact path='/rating/:url/:id' component={Rating} />
          <Route exact path='/review/:id' component={ReviewsU} />
          <Route exact path='/customersatisfaction/:id' component={Reviews} />
          <Route exact path='/ratingM/:url/:id' component={Rating} />
          <Route exact path='/tabmenu/:url/:id' component={Tabmenu} />
          <Route exact path='/updatepassword' component={Updatepass} />
          <Alerts />
          <Alerts2 />
          <ReactNotification />
        </Fragment>
      </Router>
    </Provider>
  </div>
  );
}

export default App;
