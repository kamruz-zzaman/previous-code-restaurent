import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getdish } from '../../actions/dish';
import AlldishesUI from './AlldishesUIM'
import { getuserdeal } from '../../actions/deals';
//all dishes show in menu
const AlldishesM = ({
  getdish, getuserdeal,
  dishes: { dishes, loading },
  deals: { Userdeals, uloading},
 id
}) => {
  useEffect(() => {
    getdish(id);
  }, [getdish]);

  return loading ? (
    <div>Loading ....</div>
  ) : (
    <Fragment>
      <div>
    
        <div className='grid-containerUM'>
          
          {dishes.length===0?(<p>No dish Added Yet!</p>):(<Fragment>{dishes.map((dishes) => (
            <AlldishesUI
              key={dishes.ressult_id}
              dishes={dishes}
            />
          ))}</Fragment>)}
          
         

         
        </div>
      </div>
    </Fragment>
  );
};

AlldishesM.propTypes = {
  getdish: PropTypes.func.isRequired,
  dishes: PropTypes.object.isRequired,
  getuserdeal: PropTypes.func.isRequired,
  deals: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  dishes: state.dishes,
  deals: state.deals,
});
export default connect(mapStateToProps, { getdish,getuserdeal })(AlldishesM);
