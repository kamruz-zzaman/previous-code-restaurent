import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

//show all menu UI
const AllmenuUI = ({
  auth,
  menus: { Menu_id, Totaldishes, Menu_Name, Menu_Description },
  id
  
}) => (

  <tbody>
  <tr>
    <td>{Menu_Name} </td>
    <td>{Menu_Description}</td>
    <td>
    {Menu_Name==='Deals'?(<Fragment><Link to={`/add-deal/${id}/${Menu_id}`}className='btn btn-light'>View/Add dishes</Link></Fragment>):(<Fragment><Link to={`/add-dish/${Menu_Name}/${id}/${Menu_id}`}className='btn btn-light'>View/Add dishes</Link></Fragment>)}</td>
    <td><Link to={`/menu/${id}/${Menu_id}`}className='btn btn-light'>{Totaldishes}</Link></td>
   
  </tr>
  
  </tbody>
 
);


AllmenuUI.propTypes = {
  menus: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(AllmenuUI);