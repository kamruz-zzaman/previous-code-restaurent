import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getdish } from '../../actions/dish';
import AlldishesUI from './AlldishesAUI'
import { Link} from 'react-router-dom';
const AlldishesA = ({
  getdish,
  dishes: { dishes, loading,update },
  match,
  id,
  rid,
  name
}) => {
  useEffect(() => {
    getdish(id);
  }, [getdish]);
  const [comp_update, set_comp_update] = useState(1);
  if(update && comp_update%2!=0)
  {
    console.log("Hello updatee dish")
    set_comp_update(comp_update+1)
    getdish(id);
    set_comp_update(comp_update+1)
  }
  // All dishes 
  return loading ? (
    <div>Loading ....</div>
  ) : (
    <Fragment>
     <div className='table-wrapper'>
         <h1 className='large text-center text-primary'>{name} Dishes</h1>
        <table className='servicesT'>
        
        <tbody>
          <tr>
            <th width="10%">#</th>
          <th width="10%">Dish Name</th>
          <th width="10%">Dish Price</th>
          <th width="20%">Dish Description</th>
          <th width="10%">Upload Image</th>
          <th width="10%"> Link Variation</th>
          <th width="10%"> Linked Variations</th>
          <th width="10%"></th>
          <th width="10%"></th>
          </tr>
    </tbody>
    {!dishes.length?(<Fragment>
      <tbody>
  <tr>
    <td>None </td>
    <td>None</td>
    <td>None</td>
    <td>None</td>
    <td>None</td>
    <td>None</td>
    <td>None</td>
    <td>None</td>
    <td>None</td>
  </tr>
  
  </tbody>

    </Fragment>):(<Fragment>{dishes.map((dishes,i) => (
            <AlldishesUI
              key={dishes.ressult_id}
              dishes={dishes}
              id={rid}
              index={i+1}
            />
          ))}</Fragment>)}
        
        
         
        </table>
        
      </div>
   
    </Fragment>
  );
};

AlldishesA.propTypes = {
  getdish: PropTypes.func.isRequired,
  dishes: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  dishes: state.dishes,
});
export default connect(mapStateToProps, { getdish })(AlldishesA);
