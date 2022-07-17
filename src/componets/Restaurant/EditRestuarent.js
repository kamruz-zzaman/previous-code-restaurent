import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SearchBox from 'tomtom-react-searchbox';
import { getrestaurant, Editrestaurant } from '../../actions/restaurant'
//import { addservice } from '../../actions/service';
import configData from "../../config.json";

//Edit restaurant by owner Form
const EditRestuarant = ({ getrestaurant, Editrestaurant, match, restuarants: { restuarant, loading } }) => {
  useEffect(() => {
    getrestaurant(match.params.id);
  }, [getrestaurant]);
  const [formData, setFormData] = useState({
    Name: loading || !restuarant.Name ? '' : restuarant.Name,
    Address: loading || !restuarant.Address ? '' : restuarant.Address,
    PostCode: loading || !restuarant.PostCode ? '' : restuarant.PostCode,
    Layout: loading || !restuarant.Layout ? '' : restuarant.Layout,
  });
  const [logoimage, setimage] = useState();

  const { Name, Address, PostCode, Layout } = formData;
  const [distance, setdistance] = useState('');
  const [initiaload, setinitialload] = useState(false);
  const [traveltime, settraveltime] = useState('');
  // set the entered data into state
  console.log(formData)
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onFileChange = (e) => {
    setimage(
      e.target.files[0]);
  };
  // submit the formdata to API
  const onSubmit = async (e) => {
    e.preventDefault();

    const Data = new FormData();
    if (logoimage) {

      Data.append('logo', logoimage, logoimage.name);
      Editrestaurant(formData, Data, match.params.id)
    }
    else {

      Editrestaurant(formData, '', match.params.id)
    }



  };

  const fetchdistance = (x) => {
    var lat, lon;

    console.log(x)
    setFormData({ ...formData, Address: x.address.freeformAddress, PostCode: x.address.postalCode });





  }
  return loading ? (
    <div>Loading ....</div>
  ) : (
    <Fragment>
      <div className='containerB'>
        <div className='cardB'>
          {!restuarant.Logo ? (<img
            className='roundimgE2'
            src={configData.SERVER_URL + '/public/f5a38c06-8301-427d-bdec-0fba15540a54-dc2781ef-1782-4efb-8918-e4aa4b1f4efb-image-coming-soon2.png'}
            alt="logo"
          />) : (<img
            className='roundimgE2'
            src={configData.SERVER_URL + restuarant.Logo}
            alt='Logo'
          />)}
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
              <p>Address: {Address}</p>

            </div>
            <div className='form-group'>

              <p>Enter Address to Update</p>


              <SearchBox
                onResultChoose={(result) => fetchdistance(result)}

                searchOptions={{
                  key: 'l2nwZ2J9wGbTZRb9C8OyAzv7pv0E30iY',
                  language: 'en-Gb',
                  countrySet: 'GB',
                  limit: 5,
                  typeahead: true
                }}
              />
            </div>
            <div className='form-group'>
              <p>Enter PostCode</p>
              <input
                type='text'
                placeholder='Enter PostCode'
                name='PostCode'
                value={PostCode}
                onChange={(e) => onChange(e)}
              //required
              />
            </div>
            <div className='form-group'>
              <p>Select Menu View Layout:</p>
              <label className="radio-img">
                <input type="radio" name="Layout" value="cards" onChange={(e) => onChange(e)} checked={Layout === 'cards' ? (true) : (false)} />
                <div className="imageR " ><i className="fas fa-grip-horizontal icon-radio-btn"></i></div>
              </label>

              <label className="radio-img">
                <input type="radio" name="Layout" value="accordion" onChange={(e) => onChange(e)} checked={Layout === 'accordion' ? (true) : (false)} />

                <div className="imageR"> <i className="fas fa-bars icon-radio-btn"></i></div>
              </label>
            </div>
            <div className='form-group'>
              <p>Choose Logo to Update:</p>
            </div>

            <div className='form-group'>

              <input
                type='file'
                id='image'
                name='image'
                onChange={(e) => onFileChange(e)}
              />

            </div>
            <div className='centerbtn'>
              <input type='submit' className='btnnLRM btn-primary' value='Save Changes ' />
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

EditRestuarant.prototype = {
  restuarants: PropTypes.object.isRequired,
  getrestaurant: PropTypes.func.isRequired,
  Editrestaurant: PropTypes.func.isRequired,

};
const mapStateToprops = (state) => ({
  restuarants: state.restuarants,

});
export default connect(mapStateToprops, { getrestaurant, Editrestaurant })(EditRestuarant);