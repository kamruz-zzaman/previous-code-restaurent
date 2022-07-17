import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { GetRestaurantbyadmin, Editrestaurantbyadmin } from '../../actions/restaurant'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
//Edit restuarant by Admin Form
const EditRestuarantbyAdmin = ({ GetRestaurantbyadmin, Editrestaurantbyadmin, match, adminrestaurants: { adminrestaurant, loading2 } }) => {
  const [formData, setFormData] = useState({
    Name: loading2 || !adminrestaurant.Name ? '' : adminrestaurant.Name,
    Address: loading2 || !adminrestaurant.Address ? '' : adminrestaurant.Address,
    Status: loading2 || !adminrestaurant.Status ? '' : adminrestaurant.Status,
    expiry_date: loading2 || !adminrestaurant.expiry_date ? '' : adminrestaurant.expiry_date
  });
  useEffect(() => {
    GetRestaurantbyadmin(match.params.id);
  }, [GetRestaurantbyadmin]);


  //set the already filled data of the restaurant in the states 


  //   const Menudata = useSelector(state => dishes)
  //now set this array into your initial array
  useEffect(() => {

    setFormData(state => ({
      Name: loading2 || !adminrestaurant.Name ? '' : adminrestaurant.Name,
      Status: loading2 || !adminrestaurant.Status ? '' : adminrestaurant.Status,
      Address: loading2 || !adminrestaurant.Address ? '' : adminrestaurant.Address,
      expiry_date: loading2 || !adminrestaurant.expiry_date ? '' : adminrestaurant.expiry_date
    }))

  }, [adminrestaurant]);


  const { Name, Address, Status, expiry_date } = formData;

  // set the entered cahnages into the state
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // submit the data to the API
  const onSubmit = async (e) => {
    e.preventDefault();
    Editrestaurantbyadmin(formData, match.params.id)




  };


  return loading2 ? (
    <div>Loading ....</div>
  ) : (formData.Name === '' ? (<p>Loading......</p>) : (
    <Fragment>
      <div className='containerBR'>
        <div className='cardB'>
          <i className="fas fa-store-alt"></i>
          <h1 className='large text-primary'>Edit Restaurant</h1>

          <form className='form' onSubmit={(e) => onSubmit(e)}>
            <div className='form-group'>
              <p>Enter Restaurant Name</p>
              <input
                type='text'
                placeholder='Enter Restaurant Name'
                name='Name'
                value={Name}
                onChange={(e) => onChange(e)}
              //required
              />
            </div>
            <div className='form-group'>
              <p>Enter Restaurant Address</p>
              <textarea
                placeholder='Enter Restaurant Address'
                name='Address'
                value={Address}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <p>Enter Expiry Date</p>
              <input
                type='text'
                placeholder='Enter expiry date'
                name='expiry_date'
                value={expiry_date}
                onChange={(e) => onChange(e)}
              //required
              />
            </div>
            <div className='form-group'>
              <p>Enter Restaurant Status (Active/InActive)</p>
              <input
                type='text'
                placeholder='Enter Restaurant Status'
                name='expiry_date'
                value={Status}
                onChange={(e) => onChange(e)}
              //required
              />
            </div>




            <input type='submit' className='btnnLRM22 btn-primary' value='Save Changes ' />
            <Link className='btnnLRM2' to={`/admin/${match.params.rid}`}>go back</Link>
          </form>
        </div>
      </div>
    </Fragment>
  )
  );
};

EditRestuarantbyAdmin.prototype = {
  adminrestaurants: PropTypes.object.isRequired,
  GetRestaurantbyadmins: PropTypes.func.isRequired,
  Editrestaurantbyadmin: PropTypes.func.isRequired,

};
const mapStateToprops = (state) => ({
  adminrestaurants: state.adminrestaurants,

});
export default connect(mapStateToprops, { GetRestaurantbyadmin, Editrestaurantbyadmin })(EditRestuarantbyAdmin);