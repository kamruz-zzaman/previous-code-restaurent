import React from 'react';
import { Link } from 'react-router-dom';

//landing page
const Landing = () => {
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Resturant QR Menu</h1>
          <p className='lead'>Get Register today to use QR Code Menu which is alternative to disposable paper menus. With our Application you can easily create and update your menu, our QR code menu will help your customer and your team.</p>
          <div>
            <Link to='/register' className='btn btn-primary'>
              Sign Up
            </Link>
            <Link to='/login' className='btn btn-light'>
              Login
            </Link>
         
          </div>
        </div>
      </div>
    </section>
  );
};
export default Landing;
