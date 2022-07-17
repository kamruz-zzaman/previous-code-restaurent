import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// show all restaurant UI and button to see menu and add menu of the restaurant and update restaurant
const AllrestaurantUI = ({

  restuarants: { Resturant_id, Key_ID, Name, Address, Status }, id,
}) => {
  const [status, setstatus] = useState({});
  return (
    <tbody>
      <tr>
        <td>{Name} </td>
        <td>{Address}</td>
        <td><Link to={`/addmenu/${id}/${Resturant_id}`} className='btn btn-light'>
          ADD Menu
        </Link></td>
        <td><Link to={`/menus/${Key_ID}/${Resturant_id}`} className='btn btn-light'>
          View WebPage
        </Link></td>
        <td><Link to={`/editrestaurant/byadmin/${id}/${Resturant_id}`} className='btn btn-light'>
          Update Restuarant
        </Link></td>
        <td>
          <label className="switch">
            {/* <input type="checkbox" defaultChecked={checkstatus()}/> */}
            <span className="slider round"></span>
          </label>
        </td>

      </tr>
    </tbody>
  )
};

AllrestaurantUI.propTypes = {
  restuarants: PropTypes.object.isRequired,

};

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, {})(AllrestaurantUI);