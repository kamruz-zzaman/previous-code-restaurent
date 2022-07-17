import React, { useEffect, Fragment, useState, useReducer } from 'react';
import { Link } from 'react-router-dom';
import Allmenu from './Menu/Allmenu';
import { getrestaurant, addLogo } from '../actions/restaurant'
import { setAlert } from '../actions/alert';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import Notification from './order/notification'
import Allorder from './order/orderList'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import configData from "../config.json";
var QRCode = require('qrcode.react');
//owner dashboard 
export const Dashboard = ({ match, setAlert, auth: { user }, getrestaurant, addLogo, restuarants: { restuarant, loading }, logout }) => {

  const [open2, setOpen2] = useState(false);
  const closeModal2 = () => setOpen2(false);
  // toggle menu list
  const [showuploader, setsshowuploader] = useState(false);
  const [logoimage, setimage] = useState();
  // set the uploaded logo image of the restaurant
  const onFileChange = (e) => {

    setimage(
      e.target.files[0]);
  };
  // show upload logo option 
  const handleAddClick = () => {
    setsshowuploader(true)
  }

  // submit the logo to API
  const onSubmit = async (e) => {
    e.preventDefault();
    // check if image is uploaded 
    if (logoimage === undefined) {
      setAlert('Please choose a Logo image to upload', 'danger');
    }
    // if uploaded send it to API
    else {
      const Data = new FormData();
      Data.append('logo', logoimage, logoimage.name);
      addLogo(Data, match.params.id)
    }
  };
  return (
    <Fragment>
      {user.restaurant[0].Key_ID === undefined ? (<div>Loading ....</div>) : (
        <Fragment>
          <Fragment>  <div className='grid-containerr'>

            <main className='main'>
              <div className='main-overview'>
                <Link to={`/addmenu/${match.params.id}`} className='overviewcard'>
                  Menu
                </Link>

                <Link to={`/editrestaurant/${match.params.id}`} className='overviewcard'>
                  Update Restaurant{' '}
                </Link>
                <Link to={`/AddReviewtag/${match.params.id}`} className='overviewcard'>
                  Add Review Tag{' '}
                </Link>
                <Link to={`/AddVariationtype/${match.params.id}`} className='overviewcard'>
                  Variations
                </Link>
                <Link to={`/review/${match.params.id}`} className='overviewcard'>
                  Show Reviews
                </Link>

                <Link to={`/menus/${user.restaurant[0].Key_ID}/${user.restaurant[0].id}`} className='overviewcard'>
                  View Menu
                </Link>
                <Link to={`/usermenu/${user.restaurant[0].Key_ID}/${user.restaurant[0].id}`} className='overviewcard'>
                  View WebPage
                </Link>
                <Link to={`/updatepassword`} className='overviewcard'>
                  Reset Password
                </Link>
                <Link to={`/customersatisfaction/${user.restaurant[0].id}`} className='overviewcard'>
                  Customer Satisfaction
                </Link>


              </div>

              <div className='main-cards'>
                <div className='card'>
                  <h1> All Menus</h1>
                  <Allmenu id={match.params.id} />
                </div>

                <div className='card'>
                  <h1> QR Code</h1>
                  <QRCode value={`https://menuqrcodes.co.uk/System/usermenu/${user.restaurant[0].Key_ID}/${match.params.id}`} />,
                </div>

              </div>
            </main>

            <footer className='footer'>
              <div className='footer__copyright'>&copy; Restaurants App</div>
              <div className='footer__signature'>Order Booking App</div>
            </footer>
          </div></Fragment>
          {/* </div></Fragment>) : (<Fragment><div className='grid-containerr'>

            <main className='main'>


              <div className='main-overview'>
                <Link to={`/addmenu/${match.params.id}`} className='overviewcard'>
                  Menu
                </Link>

                <Link to={`/editrestaurant/${match.params.id}`} className='overviewcard'>
                  Update Restaurant{' '}
                </Link>
                <Link to={`/AddReviewtag/${match.params.id}`} className='overviewcard'>
                  Add Review Tag{' '}
                </Link>
                <Link to={`/AddVariationtype/${match.params.id}`} className='overviewcard'>
                  Variations
                </Link>
                <Link to={`/order-report/${match.params.id}`} className='overviewcard'>
                  Order Report
                </Link>
                <Link to={`/RestuarantMenu/${match.params.id}/${restuarant.Owner_id}`} className='overviewcard'>
                  Dine In
                </Link>
                <Link to={`/RestuarantMenuT/${match.params.id}/${restuarant.Owner_id}`} className='overviewcard'>
                  Takeaway
                </Link>
                <Link to={`/RestuarantMenuD/${match.params.id}/${restuarant.Owner_id}`} className='overviewcard'>
                  Delivery
                </Link>
                <Link to={`/Todayorderlist/${match.params.id}`} className='overviewcard'>
                  Today's Orders
                </Link>
                <Link to={`/updateorderlist`} className='overviewcard'>
                  Orders List
                </Link>

                <div className='overviewcard' onClick={(e) => setOpen2(true)}>Order</div>
                <Link to={`/menus/${user.result[0].Key_ID}/${user.result[0].Resturant_id}`} className='overviewcard'>
                  View Menu
                </Link>
                <Link to={`/usermenu/${user.result[0].Key_ID}/${user.result[0].Resturant_id}`} className='overviewcard'>
                  View WebPage
                </Link>
                <Link to={`/updatepassword`} className='overviewcard'>
                  Reset Password
                </Link>
                <Link to={`/customersatisfaction/${user.result[0].Resturant_id}`} className='overviewcard'>
                  Customer Satisfaction
                </Link>
              </div>
              <Popup open={open2} className="popup-content2" closeOnDocumentClick onClose={closeModal2}>

                <a className="close" onClick={(e) => (setOpen2(false))}>
                  &times;

                </a>
                <div className='main-overview2'>
                  <Link to={`/RestuarantMenu/${match.params.id}/${restuarant.Owner_id}`} className='overviewcard'>
                    Dine In
                  </Link>
                  <Link to={`/RestuarantMenuT/${match.params.id}/${restuarant.Owner_id}`} className='overviewcard'>
                    Takeaway
                  </Link>
                  <Link to={`/RestuarantMenuD/${match.params.id}/${restuarant.Owner_id}`} className='overviewcard'>
                    Delivery
                  </Link>
                </div>
              </Popup>

              <div className='main-cards'>
                <div className='card'>
                  <h1> All Menus</h1>
                  <Allmenu id={match.params.id} />
                </div>
                <div className='card'>
                  <h1> All Order</h1>
                  <Allorder id={match.params.id} rid={restuarant.Owner_id} />
                </div>
                <div className='card'>
                  <h1> QR Code</h1>
                  <QRCode value={`https://menuqrcodes.co.uk/System/usermenu/${restuarant.Key_ID}/${match.params.id}`} />,
                </div>

              </div>
            </main>

            <footer className='footer'>
              <div className='footer__copyright'>&copy; Restaurants App</div>
              <div className='footer__signature'>Order Booking App</div>
            </footer>
          </div></Fragment>)} */}
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.prototype = {
  restuarants: PropTypes.object.isRequired,
  getrestaurant: PropTypes.func.isRequired,
  addLogo: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToprops = (state) => ({
  restuarants: state.restuarants,
  auth: state.auth,

});
export default connect(mapStateToprops, { getrestaurant, addLogo, setAlert, logout })(Dashboard);
