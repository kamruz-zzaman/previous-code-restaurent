import React, { useEffect, Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getowner } from '../../actions/admin';
//import PropTypes from 'prop-types';
import { Addrestaurant } from '../../actions/restaurant';
import SearchBox from 'tomtom-react-searchbox';

//add restaurant Form
const ADDrestaurant = ({ getowner, isAuthenticated, Addrestaurant, owners: { owners, loading2 }, match }) => {
  useEffect(() => {
    getowner();
  }, [getowner]);

  const [formData, setFormData] = useState({
    Name: '',
    Address: '',
    PostCode: '',
    OwnerID: '',

  });

  const { Name, Address, PostCode, OwnerID } = formData;
  const [distance, setdistance] = useState('');
  const [initiaload, setinitialload] = useState(false);
  const [traveltime, settraveltime] = useState('');
  //set entered data into state
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  //submit the formdata to APi
  const onSubmit = async (e) => {
    e.preventDefault();

    Addrestaurant(formData, OwnerID);
  };

  const fetchdistance = (x) => {
    var lat, lon;

    console.log(x)
    setFormData({ ...formData, Address: x.address.freeformAddress, PostCode: x.address.postalCode });
    lat = x.position.lat;
    lon = x.position.lon
    console.log(x.address.postalCode)
    fetch(`https://api.tomtom.com/routing/1/calculateRoute/${lat}%2C${lon}%3A51.55686%2C0.08472/json?avoid=unpavedRoads&key=l2nwZ2J9wGbTZRb9C8OyAzv7pv0E30iY`)
      .then(response => response.json())
      .then(
        data => {
          let t = +data.routes[0].summary.travelTimeInSeconds;
          let m = +data.routes[0].summary.lengthInMeters * 0.00062137;
          let mm = t / 60;
          mm = Math.trunc(mm)
          let sec = t % 60;
          m = parseInt(m)

          setdistance(m)
          settraveltime(`${mm}:${sec}`)
          console.log(data.routes[0].summary.lengthInMeters)
          console.log(data.routes[0].summary.travelTimeInSeconds)
          // console.log(m)
          //console.log(mm,sec)

        }

      )
      .catch(error => console.log(error));




  }
  return loading2 ? (
    <div>Loading ....</div>
  ) : (
    <Fragment>
      <div className='containerBR'>
        <div className='cardB'>
          <i className="fas fa-store-alt"></i>
          <h1 className='large text-primary'>Add Restaurant</h1>
          <p className='lead'>Create Your Restaurant</p>
          <form className='form' onSubmit={(e) => onSubmit(e)}>
            {// if there is no avaliable owner then show add owner first button 
              owners.data.length === 0 ? (<div>Add a Owner first to add Restaurant
                <Link to='/addowner' className='btn btn-light'>
                  Add owner
                </Link>
              </div>) : (<Fragment>
                <div className='form-group'>
                  <small className='form-text'>
                    Select owner
                  </small>
                  <select
                    name='OwnerID'
                    value={OwnerID}
                    onChange={(e) => onChange(e)}
                  >

                    <option value='0'>* Select Your Owner</option>
                    {owners.data === undefined ? (<p>Add a Owner first to add Restaurant</p>) : (
                      owners.data.map((owners, i) => (<option value={owners.Owner_id}>{owners.first_Name}</option>))

                    )}
                  </select>

                </div>

                <div className='form-group'>
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
                  <input
                    type='text'
                    placeholder='Enter PostCode'
                    name='PostCode'
                    value={PostCode}
                    onChange={(e) => onChange(e)}
                  //required
                  />
                </div>



              </Fragment>
              )}
          </form>
          <div className='centerbtn'>
            <input type='submit' className='btnnLRM22 btn-primary' value='Add ' />
          </div>
          <Link className='btnnLRM2' to={`/admin/${match.params.id}`}>go back</Link>
        </div>
      </div>
    </Fragment>
  );
};

ADDrestaurant.prototype = {
  owners: PropTypes.object.isRequired,
  getowner: PropTypes.func.isRequired,
  Addrestaurant: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToprops = (state) => ({
  owners: state.owners,
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToprops, { getowner, Addrestaurant })(ADDrestaurant);