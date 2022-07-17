import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { addowner } from '../../actions/auth';
import PropTypes from 'prop-types';

//add owner by admin Form
const Addownerbyadmin = ({ setAlert, addowner, isAuthenticated, match }) => {
  const [formData, setFormData] = useState({
    first_Name: '',
    last_Name: '',
    phone: '',
    email: '',
    password: '',
    password2: '',
  });

  const { first_Name, last_Name, phone, email, password, password2 } = formData;

  //set the entered value in state
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  //submit the formdata to API after checking the password
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Password do not match', 'danger');
    } else {
      addowner({ first_Name, last_Name, phone, email, password });
    }
  };


  return (
    <Fragment>
      <div className='containerBR'>
        <div className='cardB'>
          <i className="fas fa-store-alt"></i>

          <h1 className='large text-primary'>ADD Owner</h1>
          <p className='lead'>Create Owner Account</p>
          <form className='form' onSubmit={(e) => onSubmit(e)}>
            <div className='form-group'>
              <input
                type='text'
                placeholder='First Name'
                name='first_Name'
                value={first_Name}
                onChange={(e) => onChange(e)}
              //required
              />
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Last Name'
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
                placeholder='Email Address'
                name='email'
                value={email}
                onChange={(e) => onChange(e)}
              />
            </div>
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


          </form>
          <div className='centerbtn'>
            <input type='submit' className='btnnLRM22 btn-primary' value='ADD Owner ' />
          </div>
          <Link className='btnnLRM2' to={`/admin/${match.params.id}`}>go back</Link>
        </div>
      </div>
    </Fragment>
  );
};

Addownerbyadmin.prototype = {
  setAlert: PropTypes.func.isRequired,
  addowner: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToprops = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToprops, { setAlert, addowner })(Addownerbyadmin);
