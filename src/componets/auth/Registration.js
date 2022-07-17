import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

//REgistration Form
const Register = ({ setAlert, register, isAuthenticated, auth: { user, loading } }) => {
  const [formData, setFormData] = useState({
    first_Name: '',
    last_Name: '',
    phone: '',
    email: '',
    password: '',
    password2: '',
    type: '',
  });

  const { first_Name, last_Name, phone, email, password, password2, type = 'restaurant_owner' } = formData;
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const [isRevealPwd2, setIsRevealPwd2] = useState(false);
  //set the entered data into state 
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  //check if the both password is match and send the data to API
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Password do not match', 'danger');
    } else {
      register({ first_Name, last_Name, phone, email, password, type });
    }
  };

  // if token is valid then redirect to add restaurant page
  if (isAuthenticated) {

    return <Redirect to={`/addrestaurantbyadmin/${user.id}`} />;
  }

  return (
    <Fragment>
      <div className='containerBR'>
        <div className='cardB'>
          <i className="fas fa-user"></i>
          <h1 className='large text-primary'>Sign Up</h1>
          <p className='lead'>Create Your Account</p>
          <form className='form' onSubmit={(e) => onSubmit(e)}>
            <div className='form-group'>
              <input
                type='text'
                placeholder='*First Name'
                name='first_Name'
                value={first_Name}
                pattern="[a-zA-Z]*"
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='*Last Name'
                name='last_Name'
                value={last_Name}
                onChange={(e) => onChange(e)}
                pattern="[a-zA-Z]*"
                required
              />
            </div>
            <div className='form-group'>
              <input
                type='tel'
                placeholder='*Phone Number'
                name='phone'
                value={phone}
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
              <div className="pwd-container">
                <input
                  type={isRevealPwd ? "text" : "password"}
                  placeholder='*Password'
                  name='password'
                  value={password}
                  onChange={(e) => onChange(e)}
                  minLength='6'
                  required
                />

                <i className={isRevealPwd ? "fas fa-eye" : "fas fa-eye-slash"} onClick={() => setIsRevealPwd(prevState => !prevState)}></i>
              </div>
            </div>
            <div className='form-group'>
              <div className="pwd-container">
                <input
                  type={isRevealPwd2 ? "text" : "password"}
                  placeholder='*Confirm Password'
                  name='password2'
                  value={password2}
                  onChange={(e) => onChange(e)}
                  minLength='6'
                  required
                />

                <i className={isRevealPwd2 ? "fas fa-eye" : "fas fa-eye-slash"} onClick={() => setIsRevealPwd2(prevState => !prevState)}></i>
              </div>

            </div>
            <div className='centerbtn'>
              <input type='submit' className='btnnLRM btn-primary' value='Register' />
            </div>
          </form>
          <p className='my-1'>
            Already have an account? <Link to='/Login'>Sign In</Link>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

Register.prototype = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  auth: PropTypes.object.isRequired,
};
const mapStateToprops = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
});
export default connect(mapStateToprops, { setAlert, register })(Register);
