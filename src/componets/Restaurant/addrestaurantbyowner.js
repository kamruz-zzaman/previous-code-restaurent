import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
//import PropTypes from 'prop-types';
import { Addrestaurantbyowner } from '../../actions/restaurant';
import SearchBox from 'tomtom-react-searchbox';

//REgistration Form
const ADDrestaurantbyowner = ({ isAuthenticated, Addrestaurantbyowner, match }) => {
  const [checked, setChecked] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      "Name": e.target.Name.value,
      "Address": e.target.Address.value,
      "PostCode": e.target.PostCode.value,
      "enable_question": checked,
      "About": e.target.About.value,
      "Webpage": e.target.Webpage.value,
      "PhoneNumber": e.target.PhoneNumber.value,
      "EmailAddress": e.target.EmailAddress.value,
      "homeText": e.target.homeText.value,
      "AdditionalInformation": e.target.AdditionalInformation.value
    }
    Addrestaurantbyowner(data, match.params.id)
      .then(
        res => console.log(res)
      )

  };

  // if added then redirect to dasboard
  if (!isAuthenticated) {
    return <Redirect to='/login' />;
  }
  // if (isAuthenticated) {
  //   return <Redirect to={`dashboard/${match.params.id}`} />
  // }

  const onCheck = () => {
    setChecked(true)
  }
  return (
    <Fragment>
      <div className='containerBR'>
        <div className='cardB'>
          <i className="fas fa-store-alt"></i>
          <h1 className='large text-primary'>Add Restaurant</h1>
          <p className='lead'>Create Your Restaurant</p>


          <form className='form' onSubmit={(e) => onSubmit(e)}>

            <div className='form-group'>
              <input
                type='text'
                placeholder='Enter Restaurant Name'
                name='Name'
              />
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Enter Restaurant Address'
                name='Address'
              />
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Enter PostCode'
                name='PostCode'
              />
            </div>
            <div className='form-group'>
              <input
                type="checkbox"
                name='enable_question'
                onChange={onCheck}
              />&nbsp;
              <label htmlFor="">Enable question</label>
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Enter Resturent About'
                name='About'
              //required
              />
            </div>
            <div className='form-group'>
              <input
                type="url"
                placeholder='Enter Webpage Url'
                name='Webpage'
              />
            </div>
            <div className='form-group'>
              <input type="number"
                placeholder='Enter PhoneNumber'
                name='PhoneNumber'
              />
            </div>
            <div className='form-group'>
              <input type="email"
                name="EmailAddress"
                placeholder='Enter Email Address'
              />
            </div>
            <div className='form-group'>
              <input type="text"
                name="homeText"
                placeholder='Enter Home Text' />
            </div>
            <div className='form-group'>
              <input
                type="text"
                name="AdditionalInformation"
                placeholder='Enter AdditionalInformation'
                id="" />
            </div>

            <div className='centerbtn'>
              <input type='submit' className='btnnLRM btn-primary' value='Add ' />
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

ADDrestaurantbyowner.prototype = {

  Addrestaurantbyowner: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToprops = (state) => ({

  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToprops, { Addrestaurantbyowner })(ADDrestaurantbyowner);