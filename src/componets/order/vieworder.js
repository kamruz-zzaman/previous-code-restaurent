import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useSelector } from 'react-redux'
import { vieworder } from '../../actions/order'


const Vieworder = ({ vieworder, vieworders: { vieworders, loading }, match }) => {
  useEffect(() => {
    vieworder(match.params.id);
  }, [vieworder]);


  return loading ? (
    <div>Loading ....</div>
  ) : (
    <Fragment>
      <div className='containerF'>
        <div className="containernotifi">
          <div className="shopping-cart">

            <div className="column-labels">
              <label className="order-image">Image</label>
              <label className="product-details">Product</label>
              <label className="product-price">Price</label>
              <label className="product-quantity">Quantity</label>
              <label className="product-removal">Remove</label>
              <label className="product-line-price">Total</label>
            </div>

            {vieworders.dishes.length === 0 ? (<p>null</p>) : (
              <Fragment>
                {vieworders.dishes.map((dishes, i) => (
                  <Fragment>
                    <h1>Order Deatils</h1>
                    <div className='form-group'>
                      <div className="totals-item totals-item-total">
                        <p className="time-left"> Total: {vieworders.amount}£ </p>
                        <p className="time-left"> Date: {vieworders.date} </p>
                        <p className="time-left"> Time: {vieworders.time} </p>
                        <div><p className="time-left"> Table No: {vieworders.table_number} </p></div>
                      </div>
                    </div>

                    <div className='form-group'>
                      <h2>Dishes</h2>
                      <div className="product">

                        <div className="product-details">
                          <div className="product-title"><h4>{i + 1.}{' - '}Dish Name: {dishes.Dish_Name}</h4></div>
                          <p className="product-description">Type: {dishes.type}</p>
                        </div>

                        <p className="product-description">Dish Price: {dishes.Dish_Price} £</p>
                        <p className="product-description">QTY: {dishes.Qty}</p>



                      </div>
                    </div>

                  </Fragment>
                ))}
                <div className="totals">


                  <div className="totals-item totals-item-total">
                    <h4 className="time-left"> Total: {vieworders.amount}£ </h4>

                  </div>
                </div>


              </Fragment>
            )}


          </div>
        </div>
      </div>
    </Fragment>

  );

};

Vieworder.propTypes = {
  vieworder: PropTypes.func.isRequired,
  vieworders: PropTypes.object.isRequired,

};
const mapStateToProps = (state) => ({
  vieworders: state.vieworders,
});
export default connect(mapStateToProps, { vieworder })(Vieworder);
