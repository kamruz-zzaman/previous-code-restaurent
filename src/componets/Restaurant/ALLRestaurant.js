import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getallrestuarant } from '../../actions/admin';
import AllrestuarantsUI from './ALLRestuarantUI'

const Allrestuarants = ({
  getallrestuarant,
  restuarants: { restuarants, loading },
  id
}) => {
  useEffect(() => {
    getallrestuarant();
  }, [getallrestuarant]);

  // show all restaurant
  return loading ? (
    <div>Loading ....</div>
  ) : (
    <Fragment>
      <div>
        
        <table className='servicesT'>
        <tbody>
          <tr>
          <th>Name</th>
          <th>Address</th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          </tr>
        </tbody>
          
          {restuarants ===undefined ?'':(restuarants.map((restuarants,i) => (
            <AllrestuarantsUI
              key={i}
              restuarants={restuarants}
              id={id}
            />
          )))}
         
        </table>
      </div>
    </Fragment>
  );
};

Allrestuarants.propTypes = {
    getallrestuarant: PropTypes.func.isRequired,
  restuarants: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  restuarants: state.restuarants,
});
export default connect(mapStateToProps, { getallrestuarant })(Allrestuarants);
