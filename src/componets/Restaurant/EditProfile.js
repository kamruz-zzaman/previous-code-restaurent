import React, { useEffect, Fragment, useState } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { getUser, Editowner } from '../../actions/user';
import configData from "../../config.json";
//REgistration Form
const Editprofile = ({ getUser, Editowner, owners: { owner, loading2 }, match }) => {
  useEffect(() => {
    getUser(match.params.id);
  }, [getUser]);
  //filled the state with previous user data
  const [formData, setFormData] = useState({
    first_Name: loading2 || !owner.first_Name ? '' : owner.first_Name,
    last_Name: loading2 || !owner.last_Name ? '' : owner.last_Name,
    phone: loading2 || !owner.phone ? '' : owner.phone,
    image: loading2 || !owner.image ? '' : owner.image,
    Address: loading2 || !owner.Address ? '' : owner.Address,

  });

  const [logoimage, setimage] = useState();

  const {
    first_Name,
    last_Name,
    phone,
    image,
    Address,
  } = formData;


  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onFileChange = (e) => {
    setimage(
      e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const Data = new FormData();
    if (logoimage) {

      Data.append('logo', logoimage, logoimage.name);
      Editowner(formData, Data, match.params.id)
    }
    else {

      Editowner(formData, '', match.params.id)
    }


  };


  return (
    <Fragment>
      <div className='containerF'>
        <div>
          <form className='form' onSubmit={(e) => onSubmit(e)}>
            <div className='form-group'>
              <img
                className='roundPimg'
                src={configData.SERVER_URL + image}
                alt='user'
              />

            </div>
            <div className='form-group'>
              <h1 className='large text-primary'>Edit Profile</h1>
            </div>
            <div className='form-group'>
              <small className='form-text'>
                First Name
              </small>
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
              <small className='form-text'>
                Last Name
              </small>
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
              <small className='form-text'>
                Phone
              </small>
              <input
                type='number'
                placeholder='Phone'
                name='phone'
                value={phone}
                onChange={(e) => onChange(e)}
              //required
              />
            </div>
            <div className='form-group'>
              <small className='form-text'>
                Address
              </small>
              <input
                type='text'
                placeholder='Address'
                name='Address'
                value={Address}
                onChange={(e) => onChange(e)}
              //required
              />
            </div>
            <div className='form-group'>
              <input
                type='file'
                id='image'
                name='image'
                onChange={(e) => onFileChange(e)}
              />
              <label for='customFile'>Choose profile image</label>
            </div>

            <input type='submit' className='btn btn-primary' value='Save Changes ' />

          </form>
        </div>
      </div>
    </Fragment>
  );
};

Editprofile.prototype = {
  owners: PropTypes.object.isRequired,
  getUser: PropTypes.func.isRequired,
  Editowner: PropTypes.func.isRequired,
};
const mapStateToprops = (state) => ({
  owners: state.owners,
});
export default connect(mapStateToprops, { getUser, Editowner })(Editprofile);
