import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Allmenu from './Restaurant/ALLRestaurant';
import ALLorder from './order/ALLorders'
import {getadmin} from '../actions/admin'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {logout} from '../actions/auth';

//admin dashboard
export const Dashboard = ({match, getadmin,owners: {owner, loading}, logout}) => {
  useEffect(() => {
    getadmin(match.params.id);
  }, []);
  
  // toggle menu list
  function toggleMenu() {
    
    var x = document.getElementById('navbar');
    if (x.className === 'sidenav') {
      x.className += ' active';
    } else {
      x.className = 'sidenav';
    }
  }

 
 
  return loading ? (
    <div>Loading ....</div>
  ) : (
    <Fragment>
    <div className='grid-containerr'>
      
     
      
      <main className='main'>
        <div className='main-header'>
        
            <div className='main-header__updates'></div> {owner.first_Name} admin
        </div>
    
           
      
        <div className='main-overview'>
        <Link to= {`/addrestaurant/${match.params.id}`}className='overviewcard'>
            Add Restaurant
          </Link>
         
          <Link to= {`/addowner/${match.params.id}`}className='overviewcard'>
            Add Owner
          </Link>
          <Link to= {`/order-report`}className='overviewcard'>
           Order Report
          </Link>
          
          <Link to={`/updatepassword`}  className='overviewcard'>
        Reset Password
        </Link>
        
          
        </div>
       
        <div className='main-cards'>
          <div className='card'>
            <h1> All Restaurant</h1>
            <Allmenu id={match.params.id}/>
          </div>

          <div className='card'>
            <h1> All Orders</h1>
            <ALLorder id={match.params.id}/>
          </div>
         
        </div>
      </main>

      <footer className='footer'>
        <div className='footer__copyright'>&copy; Restaurants App</div>
        <div className='footer__signature'>Order Booking App</div>
      </footer>
    </div>
  </Fragment>

  );
};

Dashboard.prototype = {
owners:PropTypes.object.isRequired,
getadmin: PropTypes.func.isRequired,
logout: PropTypes.func.isRequired
};
const mapStateToprops = (state) => ({
owners: state.owners,

});
export default connect(mapStateToprops, {getadmin, logout})(Dashboard);
