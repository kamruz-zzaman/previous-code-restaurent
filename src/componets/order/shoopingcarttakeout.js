import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removecart, emptycartorder, updatecartadd, updatecartminus, addorder, editorderO } from '../../actions/shoppingcart'
import { gettables } from '../../actions/table'
import Calculator from '../calculator';
import Print from '../Print/KitchenResp';
import { setAlert } from '../../actions/alert';
const ShoopingcartOwnerTakeout = ({ setAlert, emptycartorder, editorderO, gettables, id, rid, removecart, addorder, updatecartadd, updatecartminus, products: { products, subtotal, loading, editorder, orderID }, match, tables: { tables } }) => {
  const [amount, setamount] = useState(subtotal + 3.60 + 5.00);
  const [order, setorder] = useState([{ Name: "", Description: "", Dish_Price: "", Qty: "", img: "" }]);
  const [showplaceorder, setshowplaceorder] = useState(true);
  const [showcustomerinfo, setshowcustomerinfo] = useState(false)
  const [initiaload, setinitialload] = useState(false);
  useEffect(() => {
    gettables(id);
    if (!initiaload) {
      emptycartorder();
      setinitialload(true)
    }
  }, [gettables]);
  const [formData, setFormData] = useState({
    Name: '',
    Remarks: '',
    table_number: '',
    phone: '',
    userid: '',

  });

  const { Name, Remarks, table_number, phone, userid } = formData;

  //set the entered data into state 
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  //handel changes of Qty

  useEffect(() => {
    setorder(products)
    setamount(subtotal)

  });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (Name !== '' && phone !== '') {
      console.log(Name)
      var Type = "Takeaway"
      addorder(products, amount, id, rid, { Name, Remarks, table_number, Type, userid })
      handlePrint(e);
    }
    else {
      setAlert(`Fill all the required feilds`, 'danger');
    }

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





  const hanldepayment = () => {
    if (showplaceorder) {
      setshowplaceorder(false)
    }
    else {
      setshowplaceorder(true)
    }


  }

  const handleinfo = () => {
    if (showcustomerinfo) {
      setshowcustomerinfo(false)
    }
    else {
      setshowcustomerinfo(true)
    }


  }
  var vardisplay = "";

  const setvardisplay = (x) => {
    vardisplay = x;
  }

  return (
    <Fragment>
      {showcustomerinfo ? (<Fragment>
        <div className="ownercart ownercart-body">
          <form className='formC' >

            <br />
            <h2 className="cart-subtotal">Customer Information:</h2>
            <br />
            <div >
              <small>Enter Full Name</small>
              <input
                type='text'

                name='Name'
                value={Name}
                onChange={(e) => onChange(e)}
              //required
              />

            </div>

            {' '}
            <div >
              <small>Enter Phone number</small>
              <input
                type='tel'

                name='phone'
                value={phone}
                onChange={(e) => onChange(e)}
              //required
              />
            </div>
          </form>
          <button className="checkout" onClick={(e) => (handleinfo(e))}>  {Name !== '' && phone !== '' ? (<Fragment>{Name},{phone}</Fragment>) : ('Add Customer Information')}</button>
          <button className="checkout" onClick={(e) => (handleinfo(e))}>View Cart (Total: £{amount}) </button>
          <button className="checkout" onClick={(e) => (hanldepayment(e))}>Payment</button>
          <button className="checkout" onClick={(e) => (onSubmit(e))}>Place order</button>
        </div>
      </Fragment>) : (<Fragment>
        <div className="ownercart ownercart-body">


          {showplaceorder ? (<Fragment>{order.length === 0 ? (<Fragment>
            <Fragment>
              <form className='formC' >

                <br />
                <h2 className="cart-subtotal">Customer Information:</h2>
                <br />
                <div >
                  <small>Enter Full Name</small>
                  <input
                    type='text'

                    name='Name'
                    value={Name}
                    onChange={(e) => onChange(e)}
                  //required
                  />

                </div>

                {' '}
                <div >
                  <small>Enter Phone number</small>
                  <input
                    type='tel'

                    name='phone'
                    value={phone}
                    onChange={(e) => onChange(e)}
                  //required
                  />
                </div>
              </form>
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
                        <div className="product-qty">

                          <div className='remove-product-i'>
                            {x.Qty > 1 ? (<i className=" fas fa-minus" onClick={(e) => updatecartminus(x)} ></i>) : (
                              <i className="fas fa-trash-alt" onClick={(e) => removecart(x)}></i>)}{x.Qty}  <i className="fas fa-plus" onClick={(e) => updatecartadd(x)}></i></div>
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
                    <div >
                      <p className="cart-subtotal">Subtotal:</p>
                      <p className="cart-subtotal-amount">£{subtotal} </p>

                    </div>


                  </div>
                </li>
              </ul>
              <form className='form' >
                <div className='form-group'>

                  <textarea
                    placeholder='Order Remarks'
                    name='Remarks'
                    value={Remarks}
                    onChange={(e) => onChange(e)}
                  />
                </div>


              </form>
              {editorder ? (<Fragment> <button className="checkout" onClick={(e) => (onSave(e))}>Save changes</button>
              </Fragment>) : (<Fragment>  <button className="checkout" onClick={(e) => (handleinfo(e))}>  {Name !== '' && phone !== '' ? (<Fragment>{Name},{phone}</Fragment>) : ('Add Customer Information')}</button>
                <button className="checkout" onClick={(e) => (handleinfo(e))}>View Cart (Total: £{amount}) </button>
                <button className="checkout" onClick={(e) => (hanldepayment(e))}>Payment</button>
                <button className="checkout" onClick={(e) => (onSubmit(e))}>Place order</button>

              </Fragment>)}
            </Fragment>
          )}</Fragment>) : (<Fragment>

            <Calculator total={amount} products={order} />
            <button className="checkout" onClick={(e) => (handleinfo(e))}>  {Name !== '' && phone !== '' ? (<Fragment>{Name},{phone}</Fragment>) : ('Add Customer Information')}</button>
            <button className="checkout" onClick={(e) => (handleinfo(e))}>View Cart (Total: £{amount}) </button>
            <button className="checkout" onClick={(e) => (hanldepayment(e))}>Payment</button>
            <button className="checkout" onClick={(e) => (onSubmit(e))}>Place order</button>
          </Fragment>)}


        </div>

      </Fragment>)}
      <Print products={order} total={amount} />
    </Fragment>

  );

};
ShoopingcartOwnerTakeout.propTypes = {
  removecart: PropTypes.func.isRequired,
  products: PropTypes.object.isRequired,
  tables: PropTypes.object.isRequired,
  updatecartadd: PropTypes.func.isRequired,
  updatecartminus: PropTypes.func.isRequired,
  addorder: PropTypes.func.isRequired,
  gettables: PropTypes.func.isRequired,
  editorderO: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  emptycartorder: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  products: state.products,
  tables: state.tables
});
export default connect(mapStateToProps, { setAlert, emptycartorder, removecart, updatecartadd, gettables, updatecartminus, addorder, editorderO })(ShoopingcartOwnerTakeout);