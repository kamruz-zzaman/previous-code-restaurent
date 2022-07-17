import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { gettypelink } from '../actions/variations';
import AllvarUI from './AllvariationAUI'

const AllvarationA = ({
  gettypelink,
  variations: { linkvariations, loadinglinkvariations, update },
  id,
  name
}) => {
  useEffect(() => {
    gettypelink(id);
  }, [gettypelink]);
  const [comp_update, set_comp_update] = useState(1);
  if(update && comp_update%2!=0)
  {        //window.location.reload(false);
    console.log("Hello updatee varii")
    set_comp_update(comp_update+1)
    gettypelink(id);
    set_comp_update(comp_update+1)
  }
  //show all menu
  return loadinglinkvariations ? (
    <div>Loading ....</div>
  ) : (
    <Fragment>

      <div className='table-wrapper'>
         <h1 className='large text-center text-primary'>All Variations of {name}</h1>
        <table className='servicesT'> 
        <tbody>
          <tr>
            <th width="10%">#</th>
          <th width="30%">Name</th>
          <th width="30%">Description</th>
          <th width="20%"></th>
        
          </tr>
    </tbody>
    {!linkvariations.results.length?(<Fragment>
      <tbody>
  <tr>
    <td>None </td>
    <td>None</td>
    <td>None</td>
    <td>None</td>
  </tr>
  </tbody>

    </Fragment>):(<Fragment>{linkvariations.results.map((variation,i) => (
            
            <AllvarUI
              key={i}
              linkvariations={variation}
              id={id}
              index={i+1}
            />
          ))}</Fragment>)}
          
        
   
        </table>
      </div>
    </Fragment>
  );
};

AllvarationA.propTypes = {
  gettypelink: PropTypes.func.isRequired,
  variations: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  variations: state.variations,
});
export default connect(mapStateToProps, { gettypelink })(AllvarationA);