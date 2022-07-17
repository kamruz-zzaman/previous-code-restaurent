import React, { Fragment, useState } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { forgotpassword } from '../../actions/auth';
//forgotPassword form
const ForgotPassword = ({ forgotpassword }) => {
  const [formData, setFormData] = useState({
    email: '',
  });

  const { email } = formData;

  // set the enterd data into the state
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  //send the data to API
  const onSubmit = async (e) => {
    e.preventDefault();
    forgotpassword(email)
  };





  return (
    <Fragment>
      <div className='containerB'>
        <div className='cardB'>
          <i className="fas fa-lock"></i>
          <h1 className='large text-primary'>Reset Password</h1>
          <p className='lead'>Enter Email </p>
          <form className='form' onSubmit={(e) => onSubmit(e)}>
            <div className='form-group'>
              <input
                type='email'
                placeholder='Email Address'
                name='email'
                value={email}
                onChange={(e) => onChange(e)}
              />
            </div>


            <input type='submit' className='btnnn btn-primary' value='Send Reset Link' />
          </form>
        </div>
      </div>
    </Fragment>
  );
};
ForgotPassword.prototype = {

  forgotpassword: PropTypes.func.isRequired
};
const mapStateToprops = (state) => ({


});
export default connect(mapStateToprops, { forgotpassword })(ForgotPassword);