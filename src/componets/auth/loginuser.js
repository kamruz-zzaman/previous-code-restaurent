import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAlert } from '../../actions/alert';
import { login, loadRestuarant } from '../../actions/auth';
import Guest from './guestRegistration'
import Customer from './customerRegistration';
import { addreview } from '../../actions/review';
//login form
const Loginuser = ({ login, setAlert, isAuthenticated, rate, review, id, addreview, loadRestuarant, auth: { user, loading } }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;
  const [loginflag, setloginflag] = useState(true);
  const [addreviewcheck, setaddreviewcheck] = useState(true);
  const [registrationflag, setregistrationflag] = useState(false);
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const [guestflag, setguestflag] = useState(false);
  // set the enterd data into the state
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  //send the data to API
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(password)
    // setAlert('Review submitted successfully!', 'success');
    login(email, password, review, rate, id);

  };






  // if token is valid then redirect to its dashboard according to is type

  //if (isAuthenticated && addreviewcheck) {

  // if(loading===false && user!==undefined){


  //     if(user.result[0].type==='admin'){
  //       return<Redirect to={`/admin/${user.result[0].owner_id}`}  />;}
  //       else if(user.result[0].type==='guestuser'|| user.result[0].type==='customer'){
  //         return <Redirect to={`/tabmenu/28fbb840325510a9dd306dd23416c0a6/9`}  />}
  //       else{

  //         if(user.result[0].Key_ID!==null)
  //         { 
  //           return <Redirect to={`/Restuarant/${user.result[0].Key_ID}`}  />

  //       }

  //         else{
  //           return<Redirect to={`/addrestaurantbyadmin/${user.result[0].owner_id}`}  />;;}


  //        }
  /// }

  //}

  return (
    <Fragment>
      <div>
        <section className="loginWrapper">

          <ul className="tabs">
            <li className={loginflag ? ("active") : ('')} onClick={() => (setloginflag(true), setregistrationflag(false), setguestflag(false))}>Login</li>
            <li className={registrationflag ? ("active") : ('')} onClick={() => (setregistrationflag(true), setloginflag(false), setguestflag(false))}>Register</li>
            <li className={guestflag ? ("active") : ('')} onClick={() => (setguestflag(true), setloginflag(false), setregistrationflag(false))}>guest user</li>
          </ul>
          {loginflag ? (<ul className="tab__content">


            <p className='lead'>Login In Your Account</p>
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
                <Link to='/forgotpassword'>forget password ?</Link>
              </div>

              <input type='submit' className='btnnPR  btn-primary' value='Login' />
            </form>



          </ul>
          ) : ('')}

          {registrationflag ? (<ul className="tab__content">

            <Customer rate={rate} review={review} id={id} />


          </ul>
          ) : ('')}

          {guestflag ? (<ul className="tab__content">

            <Guest rate={rate} review={review} id={id} />


          </ul>
          ) : ('')}

        </section>
      </div>
    </Fragment>
  );
};
Loginuser.prototype = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  auth: PropTypes.object.isRequired,
  loadRestuarant: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  addreview: PropTypes.func.isRequired,

};
const mapStateToprops = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,

});
export default connect(mapStateToprops, { login, loadRestuarant, setAlert, addreview })(Loginuser);
