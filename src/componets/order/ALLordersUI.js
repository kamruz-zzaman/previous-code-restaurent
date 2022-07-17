import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setstatus } from '../../actions/order';
import { vieworder } from '../../actions/order'
import PinCalculator from '../PinCalculator';
import Popup from 'reactjs-popup';
import { varifypin } from '../../actions/auth'
import 'reactjs-popup/dist/index.css';
import Alerts from '../layout/PopupAlert';
//show all order UI
const ALLorderUI = ({
  varifypin,
  setstatus,
  auth,
  orders: { Order_id, Name, date, table_number, amount, status, orderby },
  vieworder,
  vieworders: { vieworders, loading, popup }


}) => {
  var [statuss, setthestatuss] = useState('Accept');
  var [bool, setbool] = useState(false);
  var count = 0;



  const [open2, setOpen2] = useState(false);
  const closeModal2 = () => setOpen2(false);
  //set order status
  const onSubmit = (e) => {
    e.preventDefault();

    setstatus(statuss, Order_id);

  };

  const view = (e) => {
    if (bool) {
      setbool(false)
    }
    else {
      console.log('Helloview')
      vieworder(Order_id);
      setbool(true)

    }
  };
  if (open2 === true) {
    if (popup === false) {
      setOpen2(false)
    }
  }
  console.log(popup)

  return (
    <Fragment>

      <tbody>
        <tr>
          <td>{Order_id} </td>
          <td>{date}</td>
          <td>{table_number}</td>
          <td>{amount}</td>
          <td >{status}</td>
          <td>{orderby}</td>

          {status === 'completed' || status === 'Rejected' ? (<Fragment><td></td>
            <td></td></Fragment>) : (<Fragment><td>
              {status === 'pending' ? (<button
                id='myButton1'
                type='button'
                className='btn btn-success '
                name='completed'
                value={statuss}
                onClick={(e) => {
                  if (count === 0) {
                    statuss = 'in progress';
                    onSubmit(e);
                    document.getElementById('myButton1').value = 'In progress';
                    count++;
                  } else {
                    statuss = 'completed';
                    onSubmit(e);
                    count = 0;
                    document.getElementById('myButton1').value = 'Completed';
                  }
                }}>in progress
              </button>) : (<button
                id='myButton1'
                type='button'
                className='btn btn-success'
                name='completed'
                value='in progress'
                onClick={(e) => {

                  statuss = 'completed';
                  setthestatuss('completed')
                  onSubmit(e);
                  document.getElementById('myButton1').value = 'Completed';
                  count++;

                }}>
                Completed
              </button>)}
            </td>
              <td><button
                type='submit'
                className='btn btn-danger'
                name='statuss'
                onClick={(e) => {
                  statuss = 'Rejected';
                  onSubmit(e);

                }}
              >
                Reject
              </button>


              </td>

            </Fragment>)}

          <td><button
            type='submit'
            className='btn btn-danger'
            name='statuss'
            onClick={(e) => {
              setOpen2(true)
            }}
          >
            Delete
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

                {vieworders.dish.length === 0 ? (<p>null</p>) : (
                  <Fragment>
                    {vieworders.dish.map((dish, i) => (
                      <Fragment>



                        <div className='form-group'>
                          <h2>dish</h2>
                          <div className="product">

                            <div className="product-details">
                              <div className="product-title"><h4>{i + 1.}{' - '}Dish Name: {dish.Name}</h4></div>


                            </div>

                            <p className="product-description">Dish Price: {dish.Dish_Price} £</p>
                            <p className="product-description">QTY: {dish.Qty}</p>



                          </div>
                        </div>

                      </Fragment>
                    ))}
                    <div className="totals">


                      <div className="totals-item totals-item-total">
                        <h4 className="time-left"> Total: {vieworders.result[0].amount}£ </h4>

                      </div>
                    </div>


                  </Fragment>
                )}


              </div>
            </div>

          </Fragment>) : (null)}
        </Fragment>) : (null)}
      </tbody>
      <Popup open={open2} className="popup-content2" closeOnDocumentClick onClose={closeModal2}>

        <a href="#/" className="close" onClick={(e) => (setOpen2(false))}>
          &times;

        </a>
        <Alerts />
        <PinCalculator Pin={varifypin} id={Order_id} />

      </Popup>
    </Fragment>

  )
};


ALLorderUI.propTypes = {
  menus: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  setstatus: PropTypes.func.isRequired,
  vieworder: PropTypes.func.isRequired,
  vieworders: PropTypes.object.isRequired,
  varifypin: PropTypes.object.isRequired,

};

const mapStateToProps = (state) => ({
  auth: state.auth,
  vieworders: state.vieworders,

});

export default connect(mapStateToProps, { setstatus, vieworder, varifypin })(ALLorderUI);