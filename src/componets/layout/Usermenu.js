import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
//import Review from './ratingpopup'
import img from '../../img/menu.png'
import img2 from '../../img/review.png'
import { getrestaurant } from '../../actions/restaurant'
import configData from "../../config.json";
//display menu
const Usermenu = ({ getrestaurant, match, auth: { user }, restuarants: { restuarant, loading } }) => {
  useEffect(() => {
    getrestaurant(match.params.id);
  }, [getrestaurant]);

  return loading ? (
    <div>Loading ....</div>
  ) : (
    <Fragment>
      <section className='landing2'>
        <div className='dark-overlay'>
          <div className='landing-inner'>
            <div className='x-largeLogo2'>
              {user.restuarant[0].Logo ? (<img
                className="centerImage2"
                src={configData.SERVER_URL + '/public/f5a38c06-8301-427d-bdec-0fba15540a54-dc2781ef-1782-4efb-8918-e4aa4b1f4efb-image-coming-soon2.png'}
                alt="logo"
              />) : (<img
                className="centerImage2"
                src={configData.SERVER_URL + '/' + restuarant.Logo}
                alt='Logo'
              />)}

            </div>
            <p className='lead2'>{restuarant.Name}</p>
            <Link className='aReview' to={`/review/${match.params.id}`} >
              Show review
            </Link>

          </div>
        </div>
      </section>
      <div className='containercenter'>
        <div className="containerBBU">
          <Link to={`/tabmenu/${match.params.url}/${match.params.id}`}>
            <img src={img} alt="image1" className="centerImage" />
          </Link>
          {restuarant.Layout === 'cards' ? (<Link className='btnUser' to={`/menus/${match.params.url}/${match.params.id}`}>  View Menu</Link>) : (<Link className='btnUser' to={`/tabmenu/${match.params.url}/${match.params.id}`}>  View Menu</Link>)}
          {/*<Link className='btnUser'to={`/menus/${match.params.url}/${match.params.id}`}>  View Menu</Link>*/}

          <Link to={`/rating/${match.params.url}/${match.params.id}`}>
            <img src={img2} alt="image2" className="centerImage" />
          </Link>
          <Link to={`/rating/${match.params.url}/${match.params.id}`} className='btnUser'>Review us</Link>
          <p className='logoname'>Address</p>
          <p className='logoname2'>{restuarant.Address}, PostCode: {restuarant.PostCode}</p>

        </div>
      </div>


    </Fragment>
  );
};

Usermenu.propTypes = {
  restuarants: PropTypes.object.isRequired,
  getrestaurant: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  restuarants: state.restuarants,
});
export default connect(mapStateToProps, { getrestaurant })(Usermenu);
