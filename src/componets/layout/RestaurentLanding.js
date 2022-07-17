import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

const Resturantlanding = ({

  auth: { user, loading },

}) => {

  // restaurant landing page 
  return loading ? (
    <p>loading...</p>
  ) : (user.result[0].type === 'waiter' ? (<Fragment><section className='landing'>
    <div className='dark-overlay'>
      <div className='landing-inner'>
        <h1 className='x-large'>Pizza-Hut</h1>
        <p className='lead'>Welcome to Resturant QR Menu App</p>
        <div className='buttons'>

          <Link to={`/wdashboard/9`} className='btn btn-light'>
            dashboard
          </Link>
          <Link to={`/menus/28fbb840325510a9dd306dd23416c0a6/9`} className='btn btn-light'>
            All Menus
          </Link>
          <Link to={`/usermenu/28fbb840325510a9dd306dd23416c0a6/9`} className='btn btn-light'>
            User Menu
          </Link>
        </div>
      </div>
    </div>
  </section></Fragment>) : (<Fragment>
    {user.result[0].type === 'subowner' || user.result[0].Status === 'Inactive' ? (<section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>{user.result[0].Name} </h1>
          <p className='lead'>Welcome to Resturant QR Menu App</p>
          <div className='buttons'>

            <Link to={`/dashboard/${user.result[0].Resturant_id}`} className='btn btn-light'>
              dashboard
            </Link>
            <Link to={`/menus/${user.result[0].Key_ID}/${user.result[0].Resturant_id}`} className='btn btn-light'>
              All Menus
            </Link>
            <Link to={`/usermenu/${user.result[0].Key_ID}/${user.result[0].Resturant_id}`} className='btn btn-light'>
              User Menu
            </Link>
          </div>
        </div>
      </div>
    </section>) : (<section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>{user.result[0].Name} </h1>
          <p className='lead'>Welcome to Resturant QR Menu App</p>
          <div className='buttons'>

            <Link to={`/dashboard/${user.result[0].Resturant_id}`} className='btn btn-light'>
              dashboard
            </Link>
            <Link to={`/menus/${user.result[0].Key_ID}/${user.result[0].Resturant_id}`} className='btn btn-light'>
              View Menu
            </Link>
            <Link to={`/usermenu/${user.result[0].Key_ID}/${user.result[0].Resturant_id}`} className='btn btn-light'>
              View WebPage
            </Link>
          </div>
        </div>
      </div>
    </section>)}
  </Fragment>
  ))



};

Resturantlanding.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, null)(Resturantlanding);
