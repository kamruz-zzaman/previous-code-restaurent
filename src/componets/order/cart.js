import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//import { getnotification, setnotifistatus, deletenotification } from '../../actions/notification';

import Shoppingcart from './shoppingcart'


const Cart = ({ products: { products, qty, loading }, id }) => {




  const [count, setcount] = useState(qty)
  // const Menudata = useSelector(state => notifications.number)

  //now set this array into your initial array
  useEffect(() => {
    setcount(qty)

  });


  // toggle menu list
  function toggleMenu() {

    var x = document.getElementById('navbarr2');
    if (x.className === 'sidenavv') {
      x.className += ' active';
    } else {
      x.className = 'sidenavv';
    }
  }



  return (

    <Fragment>
      <div>
        <div className='cart-icon' id='myTopnav1' onClick={toggleMenu}>
          <i className='fa fa-shopping-cart'></i>
          <span className='products-count'>{count}</span>
        </div>



        <aside className='sidenavv' id='navbarr2'>
          <aside>
            <div
              className='sidenavv__close-icon'
              id='closeMenu'
              onClick={() => toggleMenu()}
            >
              <i className='fa fa-times sidenavv__brand-close'></i>
            </div>
            <div className='cart__header'>

              <i className="fas fa-shopping-bag"></i>
              <h1 className='large text-primary'>Cart</h1>

            </div>
            <Shoppingcart id={id} />
          </aside>
        </aside>

      </div>
    </Fragment>

  );

};

Cart.propTypes = {
  //getnotification: PropTypes.func.isRequired,
  //notifications: PropTypes.object.isRequired,
  //setnotifistatus: PropTypes.object.isRequired,
  products: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  products: state.products,
});
export default connect(mapStateToProps, null)(Cart);
