import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removecart, updatecartadd, updatecartminus, addorder, editorderO } from '../../actions/shoppingcart'
import { gettables } from '../../actions/table'
import Calculator from '../calculator';
import Print from '../Print/KitchenResp'
const ShoopingcartOwner = ({ editorderO, gettables, id, removecart, addorder, updatecartadd, updatecartminus, products: { products, subtotal, loading, editorder, orderID }, match, tables: { tables } }) => {
  const [amount, setamount] = useState(subtotal + 3.60 + 5.00);
  const [order, setorder] = useState([{ Name: "", Description: "", Dish_Price: "", Qty: "", img: "" }]);
  const [showplaceorder, setshowplaceorder] = useState(true);
  const [showvaration, setshowvaration] = useState(false);
  useEffect(() => {
    gettables(id);

  }, [gettables]);
  const [formData, setFormData] = useState({
    Customer_Name: '',
    Remarks: '',
    table_number: '1',
    amount: amount

  });

  const { Customer_Name, Remarks, table_number } = formData;

  //set the entered data into state 
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  //handel changes of Qty
  const handleInputChange = (e, index, product) => {

    let previous = product.Qty

    const { name, value } = e.target;
    const list = [...order];
    list[index][name] = value;
    setorder(list);
    if (previous < value) {
      updatecartadd(product)

    }

    else if (previous > value) {
      updatecartminus(product)

    }
  };
  useEffect(() => {
    setorder(products)
    setamount(subtotal)

  });

  const onSubmit = async (e) => {
    e.preventDefault();
    var Type = "DineIn"
    addorder(products, amount, id, { Customer_Name, Remarks, table_number, Type })
    handlePrint(e);

  };

  const onSave = async (e) => {
    e.preventDefault();
    console.log(products)
    editorderO(products, amount, orderID, Remarks)

  };

  const handlePrint = (e) => {
    var mywindow = window.open("", "PRINT", "height=400,width=600");

    mywindow.document.write(
      "<html><head><title></title>"
    );
    mywindow.document.write("</head><body >");

    // mywindow.document.write();
    mywindow.document.write(document.getElementById('kitchen').innerHTML);
    mywindow.document.write("</body></html>");

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();

    return true;



  }




  const hanldevariations = () => {
    if (showvaration) {
      setshowvaration(false)
    }
    else {
      setshowvaration(true)
    }

  }
  const hanldepayment = () => {
    if (showplaceorder) {
      setshowplaceorder(false)
    }
    else {
      setshowplaceorder(true)
    }


  }
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

              <i className="fas fa-shopping-bag"></i>
              <h1 className='large text-primary'>Cart</h1>

            </div>
            <h3 className='center'>Empty Cart</h3>
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
                      <p className="cart-subtotal-amount">£{x.Dish_Price} </p>
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

                      <div className="product-qty">

                        <div className='remove-product-i'>
                          {x.Qty > 1 ? (<i className=" fas fa-minus" onClick={(e) => updatecartminus(x)} ></i>) : (
                            <i className="fas fa-trash-alt" onClick={(e) => removecart(x)}></i>)}{x.Qty}  <i className="fas fa-plus" onClick={(e) => updatecartadd(x)}></i></div>
                      </div>

                    </div>

                  </li>





                </Fragment>
              ))}
              <li className='sidenavv__list-item'>
                <div >
                  <div >
                    <p className="cart-subtotal">Subtotal:</p>
                    <p className="cart-subtotal-amount">£{subtotal} </p>

                  </div>


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
            {editorder ? (<Fragment> <button className="checkout" onClick={(e) => (onSave(e))}>Save changes</button>
            </Fragment>) : (<Fragment><button className="checkout" onClick={(e) => (hanldepayment(e))}>Payment</button>
              <button className="checkout" onClick={(e) => (onSubmit(e))}>Place order</button>

            </Fragment>)}
          </Fragment>
        )}</Fragment>) : (<Fragment>

          <Calculator total={amount} products={order} />
          <button className="checkout" onClick={(e) => (hanldepayment(e))}>View Cart (Total: £{amount}) </button>

          <button className="checkout" onClick={(e) => (onSubmit(e))}>Place order</button>
        </Fragment>)}


      </div>
      <Print products={order} total={amount} />
    </Fragment>

  );

};
ShoopingcartOwner.propTypes = {
  removecart: PropTypes.func.isRequired,
  products: PropTypes.object.isRequired,
  tables: PropTypes.object.isRequired,
  updatecartadd: PropTypes.func.isRequired,
  updatecartminus: PropTypes.func.isRequired,
  addorder: PropTypes.func.isRequired,
  gettables: PropTypes.func.isRequired,
  editorderO: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
  products: state.products,
  tables: state.tables
});
export default connect(mapStateToProps, { removecart, updatecartadd, gettables, updatecartminus, addorder, editorderO })(ShoopingcartOwner);