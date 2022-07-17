import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getmenu } from '../../actions/menu';
import AllmenuUI from './AllmenuUI'

const Allmenu = ({
  getmenu,
  menus: { menus, loading },
  id
}) => {
  useEffect(() => {
    getmenu(id);
  }, [getmenu]);

  //show all menu
  return loading ? (
    <div>Loading ....</div>
  ) : (
    <Fragment>
     
        
        <table className='servicesT'>
        
        <tbody>
          <tr>
          <th>Name</th>
          <th>Description</th>
          <th></th>
   
          <th>Total dishes</th>
          </tr>
    </tbody>
    {!menus.length?(<Fragment>
      <tbody>
  <tr>
    <td>None </td>
    <td>None</td>
    <td>None</td>
    <td>None</td>
   
   
  </tr>
  
  </tbody>

    </Fragment>):(<Fragment>{menus.map((menus,i) => (
            
            <AllmenuUI
              key={i}
              menus={menus}
              id={id}
            />
          ))}</Fragment>)}
          
        
   
        </table>

    </Fragment>
  );
};

Allmenu.propTypes = {
  getmenu: PropTypes.func.isRequired,
  menus: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  menus: state.menus,
});
export default connect(mapStateToProps, { getmenu })(Allmenu);
