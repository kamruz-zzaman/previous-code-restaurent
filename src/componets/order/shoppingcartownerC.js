import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removecart, emptycartorder, updatecartadd, updatecartminus, addorder, editorderO, completeOrder } from '../../actions/shoppingcart'
import { gettables } from '../../actions/table'
import Calculator from '../calculator';
import Print from '../Print/KitchenResp';
import { setAlert } from '../../actions/alert';

const ShoopingcartownerC = ({ setAlert, emptycartorder, editorderO, gettables, id, rid, removecart, addorder, updatecartadd, completeOrder, updatecartminus, products: { products, subtotal, loading, editorder, orderID, tableno }, match, tables: { tables } }) => {
  const [amount, setamount] = useState(subtotal + 3.60 + 5.00);
  const [order, setorder] = useState([{ Name: "", Description: "", Dish_Price: "", Qty: "", img: "", Type: "" }]);
  const [showplaceorder, setshowplaceorder] = useState(true);

  const [sethanldepaymentedit] = useState(false);
  const [tableid, settableid] = useState(null);
  const [initiaload, setinitialload] = useState(false);
  const [showtable, setshowtable] = useState(false)
  useEffect(() => {
    gettables(id);
    settableid(tableno)
    if (!initiaload) {
      emptycartorder();
      setinitialload(true)
    }
  }, [gettables]);
  const [formData, setFormData] = useState({
    Customer_Name: '',
    Remarks: '',
    table_number: tableid,
    Amount: amount,
    userid: ''

  });

  const { Customer_Name, Remarks } = formData;

  //set the entered data into state 
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });



  useEffect(() => {
    setorder(products)
    setamount(subtotal)

  });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (tableid !== '') {
      var Type = "DineIn"
      addorder(products, amount, id, rid, { Customer_Name, Remarks, tableid, Type })
      handlePrint(e);
      emptycartorder();
    }
    else {
      setAlert(`Select table`, 'danger');
    }

  };

  const onCompleted = async (e) => {
    e.preventDefault();

    completeOrder(orderID);


  };

  const onSave = async (e) => {
    e.preventDefault();
    console.log(products)
    console.log('editorder')
    editorderO(products, amount, orderID, Remarks, tableid)

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

  console.log(tables)



  const hanldepayment = () => {
    if (showplaceorder) {
      setshowtable(false)
      setshowplaceorder(false)
    }
    else {
      setshowtable(false)
      setshowplaceorder(true)
    }


  }

  const handletable = () => {
    if (showtable) {
      setshowtable(false)
    }
    else {
      setshowtable(true)
    }


  }



  const handleorderedit = () => {
    sethanldepaymentedit(true)
    setshowtable(false)
    setshowplaceorder(false)


  }


  //show all menu



  //Update total and count
  function updateSelectedCount() {
    document.querySelectorAll('.row .seat.selected');

    // count.innerText = selectedSeatsCount;
    //total.innerText = selectedSeatsCount * ticketPrice;
  }

  //Movie Select Event

  //Seat click event

  const addEventListener = (click, e, tid) => {

    if (e.target.classList.contains('seat') &&
      !e.target.classList.contains('occupied')) {
      e.target.classList.toggle('selected');
      settableid(tid)
      setshowtable(false)

    }
    updateSelectedCount();
  };

  var vardisplay = "";

  const setvardisplay = (x) => {
    vardisplay = x;
  }

  return (
    <Fragment>
      <div className="ownercart ownercart-body">

        {showtable ? (<Fragment>     <Fragment>  <div className="movie-container">
          <label>Select a Table: </label>


          <ul className="showcase">
            <li>
              <div className="seatt"></div>
              <small>N/A</small>
            </li>
            <li>
              <div className="seatt selected"></div>
              <small>Selected</small>
            </li>
            <li>
              <div className="seatt occupied"></div>
              <small>Occupied</small>
            </li>
          </ul>
          <br />

          <h4>Table No {tableid}</h4>
          <div className="containerCal">
            <div className="screen"></div>

            <div className="row">
              <div className="seat" onClick={(e) => addEventListener('click', e, 1)}>1</div>
              <div className="seat" onClick={(e) => addEventListener('click', e, 2)}>2</div>

              <div className="seat" onClick={(e) => addEventListener('click', e, 3)}>3</div>
              <div className="seat" onClick={(e) => addEventListener('click', e, 4)}>4</div>

            </div>
            <div className="row">
              <div className="seat" onClick={(e) => addEventListener('click', e, 5)}>5</div>

              <div className="seat occupied">6</div>
              <div className="seat occupied">7</div>
              <div className="seat" onClick={(e) => addEventListener('click', e, 8)}>8</div>

            </div>
            <div className="row">
              <div className="seat" onClick={(e) => addEventListener('click', e, 9)}>9</div>

              <div className="seat" onClick={(e) => addEventListener('click', e, 10)}>10</div>

              <div className="seat occupied">11</div>
              <div className="seat occupied">12</div>
            </div>



          </div>

        </div>
          <button className="checkout" onClick={(e) => (handletable(e))}>Select Table {tableid} </button>
          <button className="checkout" onClick={(e) => (hanldepayment(e))}>View Cart (Total: £{amount}) </button>
          <button className="checkout" onClick={(e) => (hanldepayment(e))}>Payment</button>
          <button className="checkout" onClick={(e) => (onSubmit(e))}>Place order</button>
        </Fragment>

        </Fragment>) : (<Fragment>

          {showplaceorder ? (<Fragment>{order.length === 0 ? (<Fragment>
            <Fragment>
              <div className="movie-container">
                <label>Select a Table: </label>


                <ul className="showcase">
                  <li>
                    <div className="seatt"></div>
                    <small>N/A</small>
                  </li>
                  <li>
                    <div className="seatt selected"></div>
                    <small>Selected</small>
                  </li>
                  <li>
                    <div className="seatt occupied"></div>
                    <small>Occupied</small>
                  </li>
                </ul>
                <br />

                <h4>Table No {tableid}</h4>
                <div className="containerCal">
                  <div className="screen"></div>

                  <div className="row">
                    <div className="seat" onClick={(e) => addEventListener('click', e, 1)}>1</div>
                    <div className="seat" onClick={(e) => addEventListener('click', e, 2)}>2</div>

                    <div className="seat" onClick={(e) => addEventListener('click', e, 3)}>3</div>
                    <div className="seat" onClick={(e) => addEventListener('click', e, 4)}>4</div>

                  </div>
                  <div className="row">
                    <div className="seat" onClick={(e) => addEventListener('click', e, 5)}>5</div>

                    <div className="seat occupied">6</div>
                    <div className="seat occupied">7</div>
                    <div className="seat" onClick={(e) => addEventListener('click', e, 8)}>8</div>

                  </div>
                  <div className="row">
                    <div className="seat" onClick={(e) => addEventListener('click', e, 9)}>9</div>

                    <div className="seat" onClick={(e) => addEventListener('click', e, 10)}>10</div>

                    <div className="seat occupied">11</div>
                    <div className="seat occupied">12</div>
                  </div>



                </div>

              </div>
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
                        {x.Type === 'deal' ? (<p className='product-variation'>{x.variation}</p>) : (<Fragment> {x.variation ? (
                          x.variation.map((a, i) => (<Fragment>
                            {vardisplay === a.variation_Type ? ('') : (<Fragment>
                              <p>{a.variation_Type}( {x.variation.map((y, i) => (<Fragment>
                                {a.variation_Type === y.variation_Type ? (<Fragment> {setvardisplay(a.variation_Type)}<p className='product-variation'>{y.variation_Name}  </p></Fragment>) : ''}

                              </Fragment>))} ) </p>
                            </Fragment>)}
                          </Fragment>))
                        ) : null}</Fragment>)}




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
              {editorder ? (<Fragment>
                <button className="checkout" onClick={(e) => (handletable(e))}>Select Table {tableid} </button>
                <button className="checkout" onClick={(e) => (handleorderedit(e))}>Payment</button>
                <button className="checkout" onClick={(e) => (onSave(e))}>Save changes</button>
              </Fragment>) : (<Fragment>
                <button className="checkout" onClick={(e) => (handletable(e))}>Select Table {tableid} </button>
                <button className="checkout" onClick={(e) => (hanldepayment(e))}>View Cart (Total: £{amount}) </button>
                <button className="checkout" onClick={(e) => (hanldepayment(e))}>Payment</button>
                <button className="checkout" onClick={(e) => (onSubmit(e))}>Place order</button>

              </Fragment>)}
            </Fragment>
          )}</Fragment>) : (<Fragment>
            {editorder ? (<Fragment><Calculator total={amount} products={order} />
              <button className="checkout" onClick={(e) => (onCompleted(e))}>complete order</button></Fragment>) : (<Fragment> <Calculator total={amount} products={order} />

                <button className="checkout" onClick={(e) => (hanldepayment(e))}>View Cart (Total: £{amount}) </button>

                <button className="checkout" onClick={(e) => (onCompleted(e))}>complete order</button></Fragment>)}

          </Fragment>)}</Fragment>)}



      </div>

      <Print products={order} total={amount} />
    </Fragment>

  );

};
ShoopingcartownerC.propTypes = {
  removecart: PropTypes.func.isRequired,
  products: PropTypes.object.isRequired,
  tables: PropTypes.object.isRequired,
  updatecartadd: PropTypes.func.isRequired,
  updatecartminus: PropTypes.func.isRequired,
  addorder: PropTypes.func.isRequired,
  gettables: PropTypes.func.isRequired,
  editorderO: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  completeOrder: PropTypes.func.isRequired,
  emptycartorder: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
  products: state.products,
  tables: state.tables
});
export default connect(mapStateToProps, { setAlert, removecart, emptycartorder, updatecartadd, completeOrder, gettables, updatecartminus, addorder, editorderO })(ShoopingcartownerC);