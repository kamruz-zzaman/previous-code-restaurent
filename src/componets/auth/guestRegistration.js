import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { registeguestruser, logout } from '../../actions/auth';
import { addreview } from '../../actions/review';
import PropTypes from 'prop-types';

//REgistration Form
const GuestRegistration = ({ setAlert, logout, registeguestruser, rate, review, id, addreview, isAuthenticated, match, auth: { user, loading } }) => {
  const [formData, setFormData] = useState({
    first_Name: '',
    last_Name: '',
    phone: '',
    email: '',
    password: '',
    password2: '',
    type: 'guestuser',
  });

  const { first_Name, last_Name, phone, email, password, password2, type } = formData;

  //set the entered data into state 
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  //check if the both password is match and send the data to API
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("hello Rlogin")
    // setAlert('Review submitted successfully!', 'success');
    registeguestruser({ first_Name, phone, email, phone, type }, review, rate, id);
  };

  // if token is valid then redirect review page
  //if (isAuthenticated) {

  // if(loading===false && user!==undefined){
  //  addreview(review,rate,id)

  //  }

  // }


  return (
    <Fragment>
      <div>
        <p className='lead'>Create Your Account</p>
        <form className='form' onSubmit={(e) => onSubmit(e)}>
          <div className='form-group'>
            <input
              type='text'
              placeholder='*Name'
              name='first_Name'
              value={first_Name}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              placeholder='*Email Address'
              name='email'
              value={email}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='tel'
              placeholder='Phone Number'
              name='phone'
              value={phone}
              onChange={(e) => onChange(e)}
            //required
            />
          </div>
          <input type='submit' className='btnnPR btn-primary' value='register' />
        </form>

      </div>

    </Fragment>
  );
};

GuestRegistration.prototype = {
  setAlert: PropTypes.func.isRequired,
  registeguestruser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  addreview: PropTypes.func.isRequired,
};
const mapStateToprops = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
});
export default connect(mapStateToprops, { setAlert, registeguestruser, logout, addreview })(GuestRegistration);
