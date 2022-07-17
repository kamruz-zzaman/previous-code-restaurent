import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { registeruser, logout } from '../../actions/auth';
import { addreview } from '../../actions/review';
import PropTypes from 'prop-types';

//REgistration Form
const CustomerRegistration = ({ setAlert, logout, addreview, rate, review, id, registeruser, Review, isAuthenticated, match, auth: { user, loading } }) => {
  const [formData, setFormData] = useState({
    first_Name: '',
    last_Name: '',
    phone: '',
    email: '',
    password: '',
    password2: '',
    type: 'customer',
  });

  const { first_Name, phone, email, password, password2, type } = formData;
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  //set the entered data into state 
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  //check if the both password is match and send the data to API
  const onSubmit = async (e) => {
    e.preventDefault();
    registeruser({ first_Name, phone, email, password, type }, review, rate, id);
  };

  // if token is valid then redirect review page
  // if (isAuthenticated) {


  //return <Redirect to={`/usermenu/28fbb840325510a9dd306dd23416c0a6/9`}  />
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

          <div className='form-group'>

            <div className="pwd-container">
              <input
                type={isRevealPwd ? "text" : "password"}
                placeholder='Password'
                name='password'
                value={password}
                onChange={(e) => onChange(e)}
                minLength='6'
              />

              <i className={isRevealPwd ? "fas fa-eye" : "fas fa-eye-slash"} onClick={() => setIsRevealPwd(prevState => !prevState)}></i>
            </div>
          </div>

          <input type='submit' className='btnnPR btn-primary' value='register' />
        </form>

      </div>

    </Fragment>
  );
};

CustomerRegistration.prototype = {
  setAlert: PropTypes.func.isRequired,
  registeruser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  addreview: PropTypes.func.isRequired,
};
const mapStateToprops = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
});
export default connect(mapStateToprops, { setAlert, registeruser, logout, addreview })(CustomerRegistration);
