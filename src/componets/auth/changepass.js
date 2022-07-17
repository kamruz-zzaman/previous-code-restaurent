import React, { Fragment, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { changepassword } from '../../actions/auth';
//forgotPassword form
const Changepass = ({ changepassword, auth: { user, loading, passwordupdated } }) => {
  const [formData, setFormData] = useState({
    cpassword: '',
    password: '',
    password2: '',
  });

  const { cpassword, password, password2 } = formData;
  const [isRevealPwd1, setIsRevealPwd1] = useState(false);
  const [isRevealPwd2, setIsRevealPwd2] = useState(false);
  const [isRevealPwd3, setIsRevealPwd3] = useState(false);
  const [tokenflag, settokenflag] = useState(true);
  // useEffect(() => {
  //     //if(tokenflag){
  //  // forgotpassword(user.result[0].owner_id)
  //   //settokenflag(false)
  //     }

  // },);
  //set the enterd data into the state
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  //send the data to API
  const onSubmit = async (e) => {
    e.preventDefault();
    changepassword(formData, user.result[0].owner_id);
  };


  if (passwordupdated && tokenflag) {
    settokenflag(false)
  }


  return loading ? (
    <div>Loading ....</div>
  ) : (
    <Fragment>

      {tokenflag ? (<Fragment>
        <div className='containerB'>
          <div className='cardB'>
            <i className="fas fa-user"></i>
            <h1 className='largeS text-primary'>Change Password</h1>

            <form className='form' onSubmit={(e) => onSubmit(e)}>

              <div className='form-group'>
                <p className='leadsm'>Enter Current Password</p>
                <div className="pwd-container">
                  <input
                    type={isRevealPwd1 ? "text" : "password"}
                    placeholder='Current Password'
                    name='cpassword'
                    value={cpassword}
                    onChange={(e) => onChange(e)}
                    minLength='6'
                    required
                  />
                  <i className={isRevealPwd1 ? "fas fa-eye" : "fas fa-eye-slash"} onClick={() => setIsRevealPwd1(prevState => !prevState)}></i>
                </div>
              </div>

              <div className='form-group'>
                <p className='leadsm'>Enter New Password</p>
                <div className="pwd-container">
                  <input
                    type={isRevealPwd2 ? "text" : "password"}
                    placeholder='New Password'
                    name='password'
                    value={password}
                    onChange={(e) => onChange(e)}
                    minLength='6'
                    required
                  />
                  <i className={isRevealPwd2 ? "fas fa-eye" : "fas fa-eye-slash"} onClick={() => setIsRevealPwd2(prevState => !prevState)}></i>
                </div>
              </div>
              <div className='form-group'>
                <div className="pwd-container">
                  <input
                    type={isRevealPwd3 ? "text" : "password"}
                    placeholder='Confirm Password'
                    name='password2'
                    value={password2}
                    onChange={(e) => onChange(e)}
                    minLength='6'
                    required
                  />
                  <i className={isRevealPwd3 ? "fas fa-eye" : "fas fa-eye-slash"} onClick={() => setIsRevealPwd3(prevState => !prevState)}></i>
                </div>
              </div>

              <input type='submit' className='btnnk btn-primary' value='Save Password' />
            </form>


          </div>
        </div></Fragment>) : (<Fragment> <div className='table-wrapper2'>
          <div><i className="large text-center text-primary fas fa-check-circle"></i></div><div><h1 className='large text-center text-primary'>Password Updated!</h1></div>  <Link className='large btn btn-primary' to={`/dashboard/9}`}>Back to Dashboard</Link>
        </div></Fragment>)}


    </Fragment>
  );
};
Changepass.prototype = {
  auth: PropTypes.object.isRequired,
  changepassword: PropTypes.func.isRequired
};
const mapStateToprops = (state) => ({
  auth: state.auth,

});
export default connect(mapStateToprops, { changepassword })(Changepass);