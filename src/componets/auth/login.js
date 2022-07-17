import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login, loadRestuarant } from '../../actions/auth';

//login form
const Login = ({ login, isAuthenticated, rate, review, id, loadRestuarant, auth: { user, loading } }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  // set the enterd data into the state
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  //send the data to API
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(password)
    login(email, password);

  };



  // if token is valid then redirect to its dashboard according to is type

  if (isAuthenticated) {
    if (loading === false && user !== undefined) {
      // if (user.result[0].type === 'admin') {
      //   return <Redirect to={`/admin/${user.result[0].owner_id}`} />;
      // }
      // else if (user.result[0].type === 'guestuser' || user.result[0].type === 'customer') {
      //   return <Redirect to={`/usermenu/28fbb840325510a9dd306dd23416c0a6/9`} />
      // }
      // else {

      //   if (user.result[0].Key_ID !== null) {
      //     return <Redirect to={`/dashboard/${user.result[0].Resturant_id}`} />

      //   }

      //   else {
      //     return <Redirect to={`/addrestaurantbyadmin/${user.user}`} />
      //   }


      // }
      return <Redirect to={`/dashboard/${user.id}`} />
    }

  }

  return (
    <Fragment>
      <div className='containerB-login'>
        <div className='cardB'>
          <i className="fas fa-user"></i>
          <h1 className='large text-primary'>Login</h1>
          <p className='lead'>Login In Your Account</p>
          <form className='form' onSubmit={(e) => onSubmit(e)}>
            <div className='form-group'>
              <input
                type='email'
                placeholder='Email Address'
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
                  placeholder='Password'
                  name='password'
                  value={password}
                  onChange={(e) => onChange(e)}
                  minLength='6'
                  required
                />

                <i className={isRevealPwd ? "fas fa-eye" : "fas fa-eye-slash"} onClick={() => setIsRevealPwd(prevState => !prevState)}></i>
              </div>
              {/* <Link to='/forgotpassword'>forget password ?</Link> */}
            </div>
            <div className='centerbtn'>
              <input type='submit' className='btnnLRM btn-primary' value='Login' />
            </div>
          </form>
          <p className='my-1'>
            Don't have an account? <Link to='/Register'>Sign Up</Link>
          </p>
        </div>
      </div>
    </Fragment>
  );
};
Login.prototype = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  auth: PropTypes.object.isRequired,
  loadRestuarant: PropTypes.func.isRequired,

};
const mapStateToprops = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,

});
export default connect(mapStateToprops, { login, loadRestuarant })(Login);
