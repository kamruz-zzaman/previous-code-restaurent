import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import Notification from '../order/notification'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
//Header page
const Header = ({ logout, auth: { loading, user, isAuthenticated } }) => {
  const [open2, setOpen2] = useState(false);
  const closeModal2 = () => setOpen2(false);
  function toggleMenu() {

    var x = document.getElementById('navbar');
    if (x.className === 'sidenav') {
      x.className += ' active';
    } else {
      x.className = 'sidenav';
    }
  }

  function activelink(id) {
    // console.log(id);
    // for(let i=2;i<6;i++){
    //  var x = document.getElementById(`li`+`${i}`);
    // console.log(i,id)
    // if(i=== id){
    //  console.log("link")
    // if (x.className === 'li') {
    //   x.className += ' active';
    // } else {
    //   x.className = 'li';
    //  }
    // }
    // else{
    //   x.className = 'li';
    // }
    // }
  }





  const guestLinks = (
    <div >
      <header className='header'>
        {isAuthenticated ? ('') : (<p className='headerTi'>Welcome to Resturant QR Menu App</p>)}
      </header>
    </div>
  );

  const guestLinks2 = (
    <div >
      <header className='header'>
        <ul>
          <li>
            <a onClick={logout} href='#!'>
              <i className='fas fa-sign-out-alt'></i>
              {'  '}
              <span className='hide-sm'>Logout</span>
            </a>
          </li>
        </ul>
      </header>
    </div>

  );

  return (
    <Fragment>


      {loading ? null : (
        <Fragment> {isAuthenticated ? (
          <Fragment>  {user.type === 'waiter' ? (
            <Fragment>
              <nav className='navbar bg-dark'>
                <Link to={`/Restuarant/78ce59b95c2cdf797503785c1885ddf0`}>


                  <h1>

                    <i className="fas fa-pizza-slice"></i>{' '}
                    Pizza-Hut

                  </h1>
                </Link>
                <ul>
                  <li id="li2" className='li' onClick={() => activelink("2")}>
                    <Link to={`/wdashboard/9`}>
                      Dashboard
                    </Link>

                  </li>
                  <li id="li3" className='li' onClick={() => activelink("3")}>
                    <Link to={`/RestuarantMenu/9/${user.id}`}>
                      Dine In
                    </Link>
                  </li>
                  <li id="li4" className='li' onClick={() => activelink("4")}>
                    <Link to={`/RestuarantMenuT/9/${user.id}`}>
                      Takeaway
                    </Link>
                  </li>
                  <li id="li5" className='li' onClick={() => activelink("5")}>
                    <Link to={`/RestuarantMenuD/9/${user.id}`}>
                      Delivery
                    </Link>
                  </li>
                  <li id="li6" className='li' onClick={() => activelink("6")}>
                    <Link>
                      <i className="fas fa-plus"> Order</i>
                    </Link>
                  </li>
                  <li>
                    <a onClick={logout} href='#!'>
                      <i className='fas fa-sign-out-alt'></i>

                      {'  '}
                      <span className='hide-sm'>Logout</span>
                    </a>
                  </li>
                </ul>



              </nav>
              <div className='grid-containerr'>

                <main className='main'>
                  <div><Notification /></div>
                </main>
              </div>
              <Popup open={open2} className="popup-content2" closeOnDocumentClick onClose={closeModal2}>

                <a className="close" onClick={(e) => (setOpen2(false))}>
                  &times;

                </a>
                <div className='main-overview2'>
                  <Link to={`/RestuarantMenu/9/${user.id}`} className='overviewcard'>
                    Dine In
                  </Link>
                  <Link to={`/RestuarantMenuT/9/${user.id}`} className='overviewcard'>
                    Takeaway
                  </Link>
                  <Link to={`/RestuarantMenuD/9/${user.id}`} className='overviewcard'>
                    Delivery
                  </Link>
                </div>
              </Popup>
            </Fragment>) : (
            <Fragment>{user.type === 'admin' ? (
              <Fragment><nav className='navbar bg-dark'>
                <Link to={`/admin/${user.id}`}>
                  <h1> <i className="fas fa-pizza-slice"></i>{' '}
                    {user.result[0].Name}
                  </h1>
                </Link>

                <ul>
                  <li id="li2" className='li' onClick={() => activelink("2")}>
                    <Link to={`/admin/${user.id}`}>
                      Dashboard
                    </Link>

                  </li>




                  <li id="li7" className='li' onClick={() => activelink("7")}>
                    <Link to={`/EditProfile/${user.id}`}>
                      <i className="fas fa-user-edit"></i> Edit Profile
                    </Link>
                  </li>
                  <li>
                    <a onClick={logout} href='#!'>
                      <i className='fas fa-sign-out-alt'></i>

                      {'  '}
                      <span className='hide-sm'>Logout</span>
                    </a>
                  </li>
                </ul>


              </nav>

              </Fragment>
            ) : (
              <Fragment>{user.result[0].Status === 'Inactive' ? (
                <Fragment>
                  <nav className='navbar bg-dark'>
                    <Link to={`/dashboard/${user.restaurant[0].id}`}>
                      <h1> <i className="fas fa-pizza-slice"></i>{' '}
                        {user.result[0].Name}
                      </h1>
                    </Link>

                    <ul>
                      <li id="li2" className='li' onClick={() => activelink(2)}>
                        <Link to={`/dashboard/${user.restaurant[0].id}`}>
                          Dashboard
                        </Link>

                      </li>


                      <li id="li7" className='li' onClick={() => activelink(7)}>
                        <Link to={`/EditProfile/${user.restaurant[0].id}`}>
                          <i className="fas fa-user-edit"></i> Edit Profile
                        </Link>
                      </li>
                      <li>
                        <a onClick={logout} href='#!'>
                          <i className='fas fa-sign-out-alt'></i>

                          {'  '}
                          <span className='hide-sm'>Logout</span>
                        </a>
                      </li>
                    </ul>


                  </nav>


                </Fragment>) : (
                <Fragment>{user.result[0].Name === null ? ('') : (<Fragment>
                  {user.result[0].Status === 'Active' ? (<Fragment> <Fragment>
                    {

                      (user.result[0].type === 'guestuser' || user.type === 'customer') ? (guestLinks2) : (<Fragment><nav className='navbar bg-dark'>
                        <Link to={`/dashboard/${user.restaurant[0].id}`}>
                          <h1> <i className="fas fa-pizza-slice"></i>{' '}
                            {user.result[0].Name}
                          </h1>
                        </Link>

                        <ul>
                          <li id="li2" className='li' onClick={() => activelink(2)}>
                            <Link to={`/dashboard/${user.restaurant[0].id}`}>
                              Dashboard
                            </Link>

                          </li>
                          <li id="li3" className='li' onClick={() => activelink(3)}>
                            <Link to={`/RestuarantMenu/${user.restaurant[0].id}/${user.id}`}>
                              Dine In
                            </Link>
                          </li>
                          <li id="li4" className='li' onClick={() => activelink(4)}>
                            <Link to={`/RestuarantMenuT/${user.restaurant[0].id}/${user.id}`}>
                              Takeaway
                            </Link>
                          </li>
                          <li id="li5" className='li' onClick={() => activelink(5)}>
                            <Link to={`/RestuarantMenuD/${user.restaurant[0].id}/${user.id}`}>
                              Delivery
                            </Link>
                          </li>
                          <li id="li6" className='li' onClick={() => activelink(6)}>
                            <Link>
                              <i className="fas fa-plus" onClick={(e) => setOpen2(true)}> Order</i>
                            </Link>
                          </li>
                          <li id="li7" className='li' onClick={() => activelink(7)}>
                            <Link to={`/EditProfile/${user.id}`}>
                              <i className="fas fa-user-edit"></i> Edit Profile
                            </Link>
                          </li>
                          <li>
                            <a onClick={logout} href='#!'>
                              <i className='fas fa-sign-out-alt'></i>

                              {'  '}
                              <span className='hide-sm'>Logout</span>
                            </a>
                          </li>
                        </ul>


                      </nav>
                        <div className='grid-containerr'>

                          <main className='main'>
                            <div><Notification /></div>
                          </main>
                        </div>
                        <Popup open={open2} className="popup-content2" closeOnDocumentClick onClose={closeModal2}>

                          <a className="close" onClick={(e) => (setOpen2(false))}>
                            &times;

                          </a>
                          <div className='main-overview2'>
                            <Link to={`/RestuarantMenu/${user.restaurant[0].id}/${user.id}`} className='overviewcard'>
                              Dine In
                            </Link>
                            <Link to={`/RestuarantMenuT/${user.restaurant[0].id}/${user.id}`} className='overviewcard'>
                              Takeaway
                            </Link>
                            <Link to={`/RestuarantMenuD/${user.restaurant[0].id}/${user.id}`} className='overviewcard'>
                              Delivery
                            </Link>
                          </div>
                        </Popup></Fragment>)
                    }



                  </Fragment></Fragment>) : ('')}
                </Fragment>)}</Fragment>)}</Fragment>)}</Fragment>)}
          </Fragment>) : guestLinks} </Fragment>
      )}

    </Fragment>
  );
};

Header.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout })(Header)

