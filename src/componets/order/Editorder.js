import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';

import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

//REgistration Form
const Editorder = ({ setAlert, register, isAuthenticated, auth: { user, loading } }) => {
  const [formData, setFormData] = useState({
    first_Name: '',
    last_Name: '',
    phone: '',
    email: '',
    password: '',
    password2: '',
  });

  const { first_Name, last_Name, phone, email, password, password2 } = formData;

  //set the entered data into state 
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  //check if the both password is match and send the data to API
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Password do not match', 'danger');
    } else {
      register({ first_Name, last_Name, phone, email, password });
    }
  };



  return (
    <Fragment>
      <div className='containerB'>
        <div className='cardB'>

          <h1 className='large text-primary'>Edit Order</h1>

          <form className='form' onSubmit={(e) => onSubmit(e)}>
            <div className='form-group'>
              <p>Table Number</p>
              <input
                type='text'
                placeholder='*Table Number'
                name='first_Name'
                value={'2'}
                onChange={(e) => onChange(e)}
              //required
              />
            </div>
            <div className='form-group'>
              <p>Amount</p>
              <input
                type='text'
                placeholder='*Amount'
                name='last_Name'
                value={'21'}
                onChange={(e) => onChange(e)}
              //required
              />
            </div>
            <div className='form-group'>
              <p>Date</p>
              <input
                type='tel'
                placeholder='Date'
                name='phone'
                value={'Thursday October 15 2020'}
                onChange={(e) => onChange(e)}
              //required
              />
            </div>

            <div className='form-group'>
              <p>Dishes:</p>
              <p>1-Dish name</p>
              <input
                type='email'
                placeholder='*Dish'
                name='email'
                value={'Cheese burger'}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <p>Variation</p>
              <input
                type='text'
                placeholder='*Password'
                name='password'
                value={'Barbecue Sauce'}
                onChange={(e) => onChange(e)}
                minLength='6'
              />
            </div>
            <div className='form-group'>
              <p>QTY</p>
              <input
                type='text'
                placeholder='*Confirm Password'
                name='password2'
                value={2}
                onChange={(e) => onChange(e)}
                minLength='6'
              />
            </div>

            <input type='submit' className='btnn btn-primary' value='Save Changes' />
          </form>

        </div>
      </div>
    </Fragment>
  );
};

Editorder.prototype = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  auth: PropTypes.object.isRequired,
};
const mapStateToprops = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
});
export default connect(mapStateToprops, { setAlert, register })(Editorder);
