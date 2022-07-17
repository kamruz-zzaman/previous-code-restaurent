import React, { Fragment, useEffect,useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { gettype } from '../actions/variations';
import AllvarUI from './AllvariationtypeAUI'

const AllvarationtypeA = ({
  gettype,
  variations: { variations, loadingvariations, update },
  id
}) => {
  useEffect(() => {
    gettype(id);
  }, [gettype]);
  const [comp_update, set_comp_update] = useState(1);
  if(update && comp_update%2!=0)
  {
           // window.location.reload(false);
    console.log("Hello updatee vaar", comp_update)
    set_comp_update(comp_update+1)
    gettype(id);
    set_comp_update(comp_update+1)
  }
  //show all menu
  return loadingvariations ? (
    <div>Loading ....</div>
  ) : (
    <Fragment>

      <div className='table-wrapper'>
         <h1 className='large text-center text-primary'>All Variations Type</h1>
        <table className='servicesT'> 
        <tbody>
          <tr>
         <th width="10%">#</th>
          <th width="20%">Name</th>
          <th width="30%">Description</th>
          <th width="20%"></th>
          <th width="20%"></th>
          </tr>
    </tbody>
    {!variations.x.length?(<Fragment>
      <tbody>
  <tr>
    <td>None</td>
    <td>None </td>
    <td>None</td>
    <td>None</td>
    <td>None</td>
  </tr>
  </tbody>

    </Fragment>):(<Fragment>{variations.x.map((variation,i) => (
            
            <AllvarUI
              key={i}
              variation={variation}
              id={id}
              index={i+1}
            />
          ))}</Fragment>)}
          
        
   
        </table>
      </div>
    </Fragment>
  );
};

AllvarationtypeA.propTypes = {
  gettype: PropTypes.func.isRequired,
  variations: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  variations: state.variations,
});
export default connect(mapStateToProps, { gettype })(AllvarationtypeA);