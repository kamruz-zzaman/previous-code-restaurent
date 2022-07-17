import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getnotification, setnotifistatus, deletenotification } from '../../actions/notification';

const delay = 5;
var notification

const Notification = ({ getnotification, deletenotification, setnotifistatus,
  notifications: { notifications, loading } }) => {
  const [show, setShow] = useState(false);
  let i = 0
  useEffect((loading, notifications) => {
    getnotification(5);
    if (!loading) {
      console.log(notifications)
      let length1 = notifications;
      let timer1 = setTimeout(() => setShow(true), getnotification(5), delay * 1000);
      let length2 = notifications;
      if (length2 > length1) {
        var options = {
          body: "This is the body of the Notification",
          icon: "https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          dir: "ltr"
        };
        notification = new Notification("Notification Demo", options);
      }
      return () => {
        clearTimeout(timer1);
      };
    }
  }, []);


  const [forcerender, setforcerender] = useState(true);
  const [count, setcount] = useState(loading || !notifications.number ? 0 : notifications.number)


  //now set this array into your initial array

  useEffect(() => {
    setcount(notifications.number)

  });



  // toggle menu list
  function toggleMenu() {

    var x = document.getElementById('navbarr');
    if (x.className === 'sidenavv') {
      x.className += ' active';
    } else {
      x.className = 'sidenavv';
    }
  }

  const onClickB = (id) => {
    getnotification(5)
    setcount(count - 1);
    setnotifistatus(id)

  };



  const onClickC = async (e, id) => {
    e.preventDefault();
    console.log('Hello1')
    console.log(id)
    deletenotification(id)
    getnotification(5)

  };

  return loading ? (
    <div>Loading ....</div>
  ) : (

    <Fragment>
      {forcerender ? (<Fragment>
        <div className='profile-option' onClick={toggleMenu}>
          <div className='notification' >
            <i className='fa fa-bell'></i>
            <span className='alert-message'>{count}</span>
          </div>

        </div>


        <aside className='sidenavv' id='navbarr'>
          <aside>
            <div
              className='sidenavv__close-icon'
              id='closeMenu'
              onClick={() => toggleMenu()}
            >
              <i className='fa fa-times sidenavv__brand-close'></i>
            </div>
            <div className='cart__header'>

              <i className="fa fa-bell"></i>
              <h1 className='large text-primary'>Notification</h1>

            </div>
            <Fragment>
              <div>
                <ul className='sidenavv__list'>
                  {notifications.results.map((notifications) => (

                    <Fragment>
                      <li className='sidenavv__list-item'>
                        <p
                          key={notifications.ressult_id}

                        >
                          {notifications.message}
                        </p>
                        <span className="time-rightt" onClick={() => onClickB(notifications.id)} >{notifications.status}</span>
                        <span className="time-leftt" onClick={(e) => onClickC(e, notifications.id)} >Delete</span>
                      </li>
                    </Fragment>
                  ))}
                </ul>
              </div>
            </Fragment>
          </aside>
        </aside>
      </Fragment>) : null}
    </Fragment>

  );

};

Notification.propTypes = {
  getnotification: PropTypes.func.isRequired,
  notifications: PropTypes.object.isRequired,
  setnotifistatus: PropTypes.object.isRequired,
  deletenotification: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  notifications: state.notifications,
});
export default connect(mapStateToProps, { getnotification, setnotifistatus, deletenotification })(Notification);
