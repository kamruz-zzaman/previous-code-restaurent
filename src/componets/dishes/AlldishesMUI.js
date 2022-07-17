import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import Img from '../../img/pizza-386717_1920.jpg'
import configData from "../../config.json";
// all dishes show in menu UI
const AlldishesMUI = ({
  auth,
  dishes: { Dish_id, Dish_Name, Dish_Price, Dish_Description, image },
}) => (
  

  <tr>
    <td><h1>{Dish_Name}</h1>
    <p>
    {Dish_Description}</p> <h4>{Dish_Price} £ </h4></td>
    
    <tb>
    <img
            className='roundimgg'
              src= {configData.SERVER_URL+image}
              alt='user'
            />
    </tb>
   
  </tr>
 
);

AlldishesMUI.propTypes = {
  services: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(AlldishesMUI);