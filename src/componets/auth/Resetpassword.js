import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { Resetpassword } from '../../actions/auth';
import PropTypes from 'prop-types';

//ResetPassword Form
const ResetPassword = ({ setAlert, Resetpassword, isAuthenticated, auth: { user, loading }, match }) => {
  const [formData, setFormData] = useState({
    password: '',
    password2: '',
  });

  const { password, password2 } = formData;

  //set the entered data into state 
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });


  //check if the both password is match and send the data to API
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Password do not match', 'danger');
    } else {

      Resetpassword(formData, match.params.id);
    }
  };




  return (
    <Fragment>
      <div className='containerB'>
        <div className='cardB'>
          <i className="fas fa-user"></i>
          <h1 className='large text-primary'>Reset Password</h1>
          <p className='lead'>Enter New Password</p>
          <form className='form' onSubmit={(e) => onSubmit(e)}>

            <div className='form-group'>
              <input
                type='password'
                placeholder='Password'
                name='password'
                value={password}
                onChange={(e) => onChange(e)}
                minLength='6'
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                placeholder='Confirm Password'
                name='password2'
                value={password2}
                onChange={(e) => onChange(e)}
                minLength='6'
              />
            </div>

            <input type='submit' className='btnn btn-primary' value='Save Password' />
          </form>


        </div>
      </div>
    </Fragment>
  );
};

ResetPassword.prototype = {
  setAlert: PropTypes.func.isRequired,
  Resetpassword: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  auth: PropTypes.object.isRequired,
};
const mapStateToprops = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
});
export default connect(mapStateToprops, { setAlert, Resetpassword })(ResetPassword);
