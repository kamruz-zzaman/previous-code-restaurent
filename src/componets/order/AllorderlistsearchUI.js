import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { vieworder } from '../../actions/order'
//show all order UI
const ALLorderListUI = ({

  vieworder,
  orders: { Order_id, Name, date, table_number, amount, status },
  vieworders: { vieworders, loading }

}) => {
  var [bool, setbool] = useState(false);

  const view = (e) => {
    if (bool) {
      setbool(false)
    }
    else {
      vieworder(Order_id);
      setbool(true)
    }
  };


  return (
    <tbody>
      <tr>
        <td>{Name} </td>
        <td>{date}</td>
        <td>{table_number}</td>
        <td>{amount}</td>
        <td >{status}</td>
        <td><button className='btn btn-light' onClick={(e) => view(e)}>
          <i className="fas fa-plus"></i> View Order
        </button>


        </td>



      </tr>
      {bool ? (<Fragment>
        {!loading ? (<Fragment>

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

              {vieworders.length === 0 ? (<p>null</p>) : (
                <Fragment>
                  {vieworders.dish.map((dishes, i) => (
                    <Fragment>



                      <div className='form-group'>
                        <h2>Dishes</h2>
                        <div className="product">

                          <div className="product-details">
                            <div className="product-title"><h4>{i + 1.}{' - '}Dish Name: {dishes.Dish_Name}</h4></div>
                            <p className="product-description">Type: {dishes.Dish_Description}</p>
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

        </Fragment>) : (null)}
      </Fragment>) : (null)}
    </tbody>


  )
};


ALLorderListUI.propTypes = {
  vieworder: PropTypes.func.isRequired,
  vieworders: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  vieworders: state.vieworders,
});

export default connect(mapStateToProps, { vieworder })(ALLorderListUI);