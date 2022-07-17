import React, { useEffect, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import Allmenu from './Menu/Allmenu';
import {getrestaurant, addLogo} from '../actions/restaurant'
import { setAlert } from '../actions/alert';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {logout} from '../actions/auth';
import Notification from './order/notification'
import Allorder from './order/orderList'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import configData from "../config.json";
var QRCode = require('qrcode.react');
//owner dashboard 
export const DashboardSub = ({match,setAlert, getrestaurant, addLogo,restuarants: {restuarant, loading}, logout}) => {
  useEffect(() => {
    getrestaurant(match.params.id);
  }, [getrestaurant]);
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
    if(logoimage===undefined)
    {
      setAlert('Please choose a Logo image to upload', 'danger');
    }
    // if uploaded send it to API
    else{
    const Data = new FormData();
    Data.append('logo',logoimage, logoimage.name);
  addLogo(Data, match.params.id)
    }
  };
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
              src= {configData.SERVER_URL+restuarant.Logo}
              alt='Logo'
            />
           
          
          <div className='main-header__updates'></div> {restuarant.Name} owner
          
        </div>
       <div><Notification/></div>
        <div className='form-groupp'>  <button className='btn btn-primary-submit' onClick={(e) => handleAddClick(e)}>
        Upload Logo
      </button>
      
      </div>
            {// on click show uplad image option  
            showuploader ? (
  <Fragment>
    <div className='form-groupp'>
            <input
              type='file'
              id='image'
              name='image'
              onChange={(e) => onFileChange(e)}
            />
            <label for='customFile'>Choose Image</label>
         

          <input type='submit' className='btn btn-primary-submit' value='Add ' onClick={(e) => onSubmit(e)} />
          </div>
  </Fragment>
): null}
      
        <div className='main-overview'>
        <Link to={`/addmenu/${match.params.id}/${match.params.id}`}className='overviewcard'>
            Add Menu
          </Link>

         
          <Link to={`/editmenu/${match.params.id}`}className='overviewcard'>
            Edit Menu{' '}
          </Link>
          
          <Link to={`/editrestaurant/${match.params.id}`} className='overviewcard'>
           Update Restaurant{' '}
          </Link>
          <Link to={`/AddVariation/${match.params.id}`} className='overviewcard'>
          Add Variation{' '}
          </Link>
         
          <Link to={`/AddVariationtype/${match.params.id}`} className='overviewcard'>
          Add Variation Type{' '}
          </Link>
     

      

   
        </div>
     
        <div className='main-cards'>
          <div className='card'>
            <h1> All Menus</h1>
            <Allmenu id={match.params.id}/>
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
    </div>
  </Fragment>
  )}
  </Fragment>
  );
};

DashboardSub.prototype = {
restuarants:PropTypes.object.isRequired,
getrestaurant: PropTypes.func.isRequired,
addLogo: PropTypes.func.isRequired,
setAlert: PropTypes.func.isRequired,
logout: PropTypes.func.isRequired
};
const mapStateToprops = (state) => ({
restuarants: state.restuarants,

});
export default connect(mapStateToprops, {getrestaurant, addLogo, setAlert, logout})(DashboardSub);
