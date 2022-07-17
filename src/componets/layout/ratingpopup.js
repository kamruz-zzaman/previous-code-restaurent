import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
//import { getnotification, setnotifistatus, deletenotification } from '../../actions/notification';




const Ratingpopup = ({ review: { review, qty, loading }, page, id, url, match, name }) => {




  const [count, setcount] = useState(qty)
  // const Menudata = useSelector(state => notifications.number)

  //now set this array into your initial array
  useEffect(() => {
    setcount(qty)

  });


  // toggle menu list


  return (

    <Fragment>

      {page === 'tabmenu' ? (<Link to={`/rating/${url}/${id}`} className='cart-iconn' >

        <i className="fas fa-star-half-alt"></i>
      </Link>) : (<Link to={`/rating/${url}/${id}`} className='cart-iconn' >
        <i className="fas fa-star-half-alt"></i>
      </Link>)}





    </Fragment>

  );

};

Ratingpopup.propTypes = {
  //getnotification: PropTypes.func.isRequired,
  //notifications: PropTypes.object.isRequired,
  //setnotifistatus: PropTypes.object.isRequired,
  review: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  review: state.review,
});
export default connect(mapStateToProps, null)(Ratingpopup);