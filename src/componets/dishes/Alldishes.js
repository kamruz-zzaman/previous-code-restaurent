import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getdish } from '../../actions/dish';
import AlldishesUI from './AlldishesUI'
import { Link} from 'react-router-dom';
const Alldishes = ({
  getdish,
  dishes: { dishes, loading },
  match
}) => {
  useEffect(() => {
    getdish(match.params.id);
  }, [getdish]);

  // All dishes 
  return loading ? (
    <div>Loading ....</div>
  ) : (
    <Fragment>
      <div className='padd'>
     
        <table className='servicesG'>
          
          {dishes.map((dishes) => (
            <AlldishesUI
              key={dishes.ressult_id}
              dishes={dishes}
              id={match.params.rid}
              
            />
          ))}
         

         
        </table>
        <Link to={`/dashboard/${match.params.rid}`}>go back</Link>
      </div>
   
    </Fragment>
  );
};

Alldishes.propTypes = {
  getdish: PropTypes.func.isRequired,
  dishes: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  dishes: state.dishes,
});
export default connect(mapStateToProps, { getdish })(Alldishes);
