import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getdeal } from '../../actions/deals';
import AlldishesUI from './dealsdishesUI'

//all dishes show in menu
const Dealdishes = ({
  getdeal,
  deals: { deals, loading },
 id
}) => {
  useEffect(() => {
    getdeal(id);
  }, [getdeal]);

  return loading ? (
    <div>Loading ....</div>
  ) : (
    <Fragment>
    
    
        
          
          {deals.map((x) => (
            <AlldishesUI
              key={x}
              dishes={x}
              id={id}
              length={deals.length}
            />
          ))}
         

         
       
     
    </Fragment>
  );
};

Dealdishes.propTypes = {
  getdeal: PropTypes.func.isRequired,
  deals: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  deals: state.deals,
});
export default connect(mapStateToProps, { getdeal })(Dealdishes);
