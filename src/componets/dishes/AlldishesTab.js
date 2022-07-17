import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getdish } from '../../actions/dish';
import AlldishesUI from './AlldishesUItab'

//all dishes show in menu
const AlldishesMOwner = ({
  getdish,
  dishes: { dishes, loading },
 id
}) => {
  useEffect(() => {
    getdish(id);
  }, [getdish]);

  return loading ? (
    <div>Loading ....</div>
  ) : (
    <Fragment>
    
    
    {dishes.length===0?(<p>No dish Added Yet!</p>):(<Fragment>{dishes.map((dishes) => (
            <AlldishesUI
            key={dishes.ressult_id}
            dishes={dishes}
            id={id}
            />
          ))}</Fragment>)}
       
         

         
       
     
    </Fragment>
  );
};

AlldishesMOwner.propTypes = {
  getdish: PropTypes.func.isRequired,
  dishes: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  dishes: state.dishes,
});
export default connect(mapStateToProps, { getdish })(AlldishesMOwner);
