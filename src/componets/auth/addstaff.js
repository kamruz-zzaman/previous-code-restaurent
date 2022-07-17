import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { addstaff, logout } from '../../actions/auth';
import PropTypes from 'prop-types';

//REgistration Form
const Addstaffbyowner = ({ setAlert, logout, addstaff, Review, isAuthenticated, match, auth: { user, loading } }) => {
  const [formData, setFormData] = useState({
    first_Name: '',
    last_Name: '',
    phone: '',
    email: '',
    password: '',
    password2: '',
    type: 'waiter',
  });

  const { first_Name, last_Name, phone, email, password, password2, type } = formData;

  //set the entered data into state 
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  console.log(formData)
  //check if the both password is match and send the data to API
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Password do not match', 'danger');
    } else {
      addstaff({ first_Name, last_Name, phone, email, password, type });
    }
  };

  // if token is valid then redirect review page


  return (
    <Fragment>
      <div className='containerBR'>
        <div className='cardB'>
          <i className="fas fa-user"></i>
          <h1 className='large text-primary'>Add Staff</h1>
          <p className='lead'>Create Staff Account</p>
          <form className='form' onSubmit={(e) => onSubmit(e)}>
            <div className='form-group'>
              <input
                type='text'
                placeholder='*First Name'
                name='first_Name'
                value={first_Name}
                onChange={(e) => onChange(e)}
              //required
              />
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='*Last Name'
                name='last_Name'
                value={last_Name}
                onChange={(e) => onChange(e)}
              //required
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

            <div className='form-group'>
              <input
                type='email'
                placeholder='*Email Address'
                name='email'
                value={email}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                placeholder='*Password'
                name='password'
                value={password}
                onChange={(e) => onChange(e)}
                minLength='6'
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                placeholder='*Confirm Password'
                name='password2'
                value={password2}
                onChange={(e) => onChange(e)}
                minLength='6'
              />
            </div>

            <input type='submit' className='btnnLRM btn-primary' value='Register' />
          </form>

        </div>
      </div>
    </Fragment>
  );
};

Addstaffbyowner.prototype = {
  setAlert: PropTypes.func.isRequired,
  addstaff: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};
const mapStateToprops = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
});
export default connect(mapStateToprops, { setAlert, addstaff, logout })(Addstaffbyowner);
