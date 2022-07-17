import React, { useEffect, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import {getrestaurant, addLogo} from '../actions/restaurant'
import { setAlert } from '../actions/alert';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {logout} from '../actions/auth';
import Notification from './order/notification'
import Allorder from './order/orderList'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
var QRCode = require('qrcode.react');
//waiter dashboard 
export const WDashboard = ({match,setAlert, getrestaurant, addLogo,restuarants: {restuarant, loading}, logout}) => {
  useEffect(() => {
    getrestaurant(match.params.id);
  }, [getrestaurant]);
  const [open2, setOpen2] = useState(false);
  const closeModal2 = () => setOpen2(false);
  // toggle menu list
  

  
  const [logoimage, setimage] = useState();
  // set the uploaded logo image of the restaurant
 
  // show upload logo option 
 
// submit the logo to API
  
  return loading ? (
    <div>Loading ....</div>
  ) : (
   <Fragment>
    {restuarant.Key_ID===undefined ? (<div>Loading ....</div>): (
      <Fragment>
    <div className='grid-containerr'>
     
      <main className='main'>
        <div className='main-header'>
      
        <img
              className='roundimg'
              src= {restuarant.Logo}
              alt='user'
            />
           
          
          <div className='main-header__updates'></div> {restuarant.Name} owner
          
        </div>
       <div><Notification/></div>
    
    
            
      
        <div className='main-overview'>
   
          <Link to= {`/order-report/${match.params.id}`}className='overviewcard'>
           Order Report
          </Link>

      
          <Link to= {`/RestuarantMenu/${match.params.id}`}className='overviewcard'>
           Eat In
          </Link>
          <Link to= {`/RestuarantMenuT/${match.params.id}`}className='overviewcard'>
            Takeaway
          </Link>
          <Link to= {`/RestuarantMenuD/${match.params.id}`}className='overviewcard'>
          Delivery
          </Link>
          <Link to= {`/Todayorderlist/${match.params.id}`}className='overviewcard'>
           Today's Orders
          </Link>
          <div className='overviewcard' onClick={(e)=> setOpen2(true)}>Order</div>
        </div>
        <Popup open={open2} className="popup-content2"closeOnDocumentClick onClose={closeModal2}>
      
       <a href="#/" className="close" onClick={(e) => (setOpen2(false))}>
         &times;

       </a>
       <div className='main-overview2'>
    <Link to= {`/RestuarantMenu/${match.params.id}`}className='overviewcard'>
           Menu
          </Link>
          <Link to= {`/RestuarantMenuT/${match.params.id}`}className='overviewcard'>
           Menu Takeaway
          </Link>
          <Link to= {`/RestuarantMenuD/${match.params.id}`}className='overviewcard'>
           Menu Delivery
          </Link>
          </div>
       </Popup>
        <div className='main-cards'>
         
          <div className='card'>
            <h1> All Order</h1>
            <Allorder id={match.params.id}/>
          </div>
          <div className='card'>
            <h1> QR Code</h1>
            <QRCode value={`/menus/${restuarant.Key_ID}/${match.params.id}`} />,
          </div>
         
        </div>
      </main>

      <footer className='footer'>
        <div className='footer__copyright'>&copy; Restaurants App</div>
        <div className='footer__signature'>Order Booking App</div>
      </footer>
    </div>
  </Fragment>
  )}
  </Fragment>
  );
};

WDashboard.prototype = {
  restuarants:PropTypes.object.isRequired,
getrestaurant: PropTypes.func.isRequired,
addLogo: PropTypes.func.isRequired,
setAlert: PropTypes.func.isRequired,
logout: PropTypes.func.isRequired
};
const mapStateToprops = (state) => ({
restuarants: state.restuarants,

});
export default connect(mapStateToprops, {getrestaurant, addLogo, setAlert, logout})(WDashboard);
