import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removecart, updatecartadd, updatecartminus, addorder, editorderO } from '../../actions/dealscart'
import { gettables } from '../../actions/table'
const DealsCart = ({ editorderO, gettables, id, removecart, addorder, updatecartadd, updatecartminus, dealscart: { deals, subtotal, loading, editorder, orderID }, match, tables: { tables } }) => {
  const [amount, setamount] = useState(subtotal + 3.60 + 5.00);
  const [order, setorder] = useState([{ Name: "", Description: "", Dish_Price: "", Qty: "", img: "" }]);
  const [showplaceorder] = useState(true);


  const [formData, setFormData] = useState({
    Customer_Name: '',
    Remarks: '',
    table_number: '',

  });

  const { Customer_Name, Remarks, table_number } = formData;

  //set the entered data into state 
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  //handel changes of Qty

  useEffect(() => {
    setorder(deals)
    setamount(subtotal)

  });










  var vardisplay = "";

  const setvardisplay = (x) => {
    vardisplay = x;
  }

  return (
    <Fragment>
      <div className="ownercart ownercart-body">


        {showplaceorder ? (<Fragment>{order.length === 0 ? (<Fragment>
          <Fragment>
            <div className='cart__header'>


              <h1 className='large text-primary'>Selected</h1>

            </div>
            <h3 className='center'>No dish selected yet</h3>
          </Fragment>
        </Fragment>) : (
          <Fragment>
            <ul className='sidenavv__list'>
              {order.map((x, i) => (
                <Fragment>

                  <li className='sidenavv__list-item'>
                    {' '}
                    <div>
                      <p className='product-card-name'>{' '}{x.Name} </p>
                      <div className="product-qty">

                        <div className='remove-product-i'>
                          <i className="fas fa-trash-alt" onClick={(e) => removecart(x)}></i></div>
                      </div>
                    </div>
                    <div className="product-card-des">
                      {x.variation ? (
                        x.variation.map((a, i) => (<Fragment>
                          {vardisplay === a.variation_Type ? ('') : (<Fragment>
                            <p>{a.variation_Type}( {x.variation.map((y, i) => (<Fragment>
                              {a.variation_Type === y.variation_Type ? (<Fragment> {setvardisplay(a.variation_Type)}<p className='product-variation'>{y.variation_Name}  </p></Fragment>) : ''}

                            </Fragment>))} ) </p>
                          </Fragment>)}
                        </Fragment>))
                      ) : null}



                    </div>

                  </li>





                </Fragment>
              ))}
              <li className='sidenavv__list-item'>
                <div >


                </div>
              </li>
            </ul>
            <form className='form' >
              <div className='form-group'>
                <div className='form-group'>
                  <textarea
                    placeholder='Order Remarks'
                    name='Remarks'
                    value={Remarks}
                    onChange={(e) => onChange(e)}
                  />
                </div>
              </div>
            </form>


          </Fragment>
        )}</Fragment>) : ('')}


      </div>

    </Fragment>

  );

};
DealsCart.propTypes = {
  removecart: PropTypes.func.isRequired,
  dealscart: PropTypes.object.isRequired,
  tables: PropTypes.object.isRequired,
  updatecartadd: PropTypes.func.isRequired,
  updatecartminus: PropTypes.func.isRequired,
  addorder: PropTypes.func.isRequired,
  gettables: PropTypes.func.isRequired,
  editorderO: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
  dealscart: state.dealscart,
  tables: state.tables
});
export default connect(mapStateToProps, { removecart, updatecartadd, gettables, updatecartminus, addorder, editorderO })(DealsCart);