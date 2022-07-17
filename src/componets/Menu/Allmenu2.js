import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getmenu } from '../../actions/menu';
import AllmenuUI from './Allmenu2UI'

const Allmenu2 = ({
  getmenu,
  menus: { menus, loading, update },
  id
}) => {
  useEffect(() => {
    getmenu(id);
  }, [getmenu]);
  const [comp_update, set_comp_update] = useState(1);
  if(update && comp_update%2!=0)
  {
    set_comp_update(comp_update+1)
    getmenu(id);
    set_comp_update(comp_update+1)
  }
  //show all menu
  return loading ? (
    <div>Loading ....</div>
  ) : (
    <Fragment>

      <div className='table-wrapper'>
         <h1 className='large text-center text-primary'>All Menu</h1>
        <table className='servicesT'>
        
        <tbody>
          <tr>
          <th width="10%">#</th>
          <th width="10%">Name</th>
          <th width="30%">Description</th>
          <th width="20%">Total dishes</th>
          <th width="20%">View dishes</th>
          <th width="10%"></th>
          </tr>
    </tbody>
    {!menus.length?(<Fragment>
      <tbody>
  <tr>
    <td>None </td>
    <td>None</td>
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
              index={i}
            />
          ))}</Fragment>)}
          
        
   
        </table>
      </div>
    </Fragment>
  );
};

Allmenu2.propTypes = {
  getmenu: PropTypes.func.isRequired,
  menus: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  menus: state.menus,
});
export default connect(mapStateToProps, { getmenu })(Allmenu2);
