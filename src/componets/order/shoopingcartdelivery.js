
import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removecart, updatecartadd, updatecartminus, emptycartorder, addorder, editorderO, openfavdish } from '../../actions/shoppingcart'
import { gettables } from '../../actions/table'
import Calculator from '../calculator';
import Print from '../Print/KitchenResp'
import { setAlert } from '../../actions/alert';
import SearchBox from 'tomtom-react-searchbox';
import { loaduser } from '../../actions/user';
import { useSelector } from 'react-redux'
import { getfavorder } from '../../actions/order'
const ShoopingcartOwnerdelivery = ({ loaduser, emptycartorder, openfavdish, getfavorder, orders: { favorderlist, loadingfavorder }, editorderO, gettables, id, rid, removecart, addorder, updatecartadd, updatecartminus, setAlert, owners: { owner, loading2 }, products: { products, subtotal, loading, editorder, orderID }, match, tables: { tables } }) => {
  const [amount, setamount] = useState(subtotal + 3.60 + 5.00);
  const [order, setorder] = useState([{ Name: "", Description: "", Dish_Price: "", Qty: "", img: "" }]);
  const [showplaceorder, setshowplaceorder] = useState(true);
  const [showcustomerinfo, setshowcustomerinfo] = useState(false)
  const [autofill, setautofill] = useState(true)
  const [favorder, setfavorder] = useState(true)
  const [showvaration, setshowvaration] = useState(false);
  const [distance, setdistance] = useState('');
  const [initiaload, setinitialload] = useState(false);
  const [traveltime, settraveltime] = useState('');
  const [formData, setFormData] = useState({
    Name: loading2 || !owner.first_Name ? '' : owner.first_Name,
    phone: '',
    Remarks: '',
    post: '',
    address: '',
    table_number: '',
    userid: '',

  });

  const { Name, phone, Remarks, address, table_number, userid } = formData;

  //set the entered data into state 
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onChangePhone = async (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value })
    //loaduser(phone);
  };
  useEffect(() => {
    gettables(id);
    if (!initiaload) {
      emptycartorder();
      setinitialload(true)
    }
  }, [gettables]);


  //handel changes of Qty




  useEffect(() => {
    setorder(products)
    setamount(subtotal)
    async function fetchMyAPI() {
      if (phone.length > 4 && autofill) {
        console.log('helloload')
        await loaduser(phone)
        await setFormData({ ...formData, Name: loading2 || !owner.first_Name ? '' : owner.first_Name, userid: loading2 || !owner.Owner_id ? '' : owner.Owner_id, address: loading2 || !owner.Address ? '' : owner.Address });
        if (!loading2) {
          await getfavorder(owner.Owner_id)
          setfavorder(false)
        }
        setautofill(false)


      }
    }
    fetchMyAPI()


  });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (Name !== '' && phone !== '' && address !== '') {
      var Type = "Delivery"
      addorder(products, amount, id, rid, { Name, Remarks, table_number, Type, userid, phone, address })
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

  const handelfav = () => {
    if (favorder) {
      setfavorder(false)
    }
    else {
      setfavorder(true)
    }
  }
  var vardisplay = "";

  const setvardisplay = (x) => {
    vardisplay = x;
  }

  const fetchdistance = (x) => {
    var lat, lon;

    console.log(x)
    setFormData({ ...formData, address: x.address.freeformAddress, post: x.address.postalCode });
    lat = x.position.lat;
    lon = x.position.lon

    fetch(`https://api.tomtom.com/routing/1/calculateRoute/${lat}%2C${lon}%3A51.55686%2C0.08472/json?avoid=unpavedRoads&key=l2nwZ2J9wGbTZRb9C8OyAzv7pv0E30iY`)
      .then(response => response.json())
      .then(
        data => {
          let t = +data.routes[0].summary.travelTimeInSeconds;
          let m = +data.routes[0].summary.lengthInMeters * 0.00062137;
          let mm = t / 60;
          mm = Math.trunc(mm)
          let sec = t % 60;
          m = parseInt(m)

          setdistance(m)
          settraveltime(`${mm}:${sec}`)
          console.log(data.routes[0].summary.lengthInMeters)
          console.log(data.routes[0].summary.travelTimeInSeconds)
          // console.log(m)
          //console.log(mm,sec)

        }

      )
      .catch(error => console.log(error));




  }

  console.log(formData)
  console.log(traveltime)

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
                minlength='9'
                maxlength='14'
                name='phone'
                value={phone}
                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required
                onChange={(e) => onChangePhone(e)}
              //required
              />
            </div>
            <small>Enter Address</small>


            <SearchBox
              onResultChoose={(result) => fetchdistance(result)}
              searchOptions={{
                key: 'l2nwZ2J9wGbTZRb9C8OyAzv7pv0E30iY',
                language: 'en-Gb',
                countrySet: 'GB',
                limit: 5,
                typeahead: true
              }}
            />
            {distance ? (<Fragment>

              <div><i className="fa fa-clock-o" aria-hidden="true"></i> Travel Time : {traveltime} {'  '} <i className="fas fa-route" ></i> Distance : {distance} miles</div>

            </Fragment>) : ''}
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
                <small>Enter Address</small>


                <SearchBox
                  onResultChoose={(result) => fetchdistance(result)}
                  searchOptions={{
                    key: 'l2nwZ2J9wGbTZRb9C8OyAzv7pv0E30iY',
                    language: 'en-Gb',
                    countrySet: 'GB',
                    limit: 5,
                    typeahead: true,

                  }}
                />

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
              </Fragment>) : (<Fragment><button className="checkout" onClick={(e) => (handleinfo(e))}>  {Name != '' && phone != '' ? (<Fragment>{Name},{phone}</Fragment>) : ('Add Customer Information')}</button>
                <button className="checkout" onClick={(e) => (handleinfo(e))}>View Cart (Total: £{amount}) </button>
                <button className="checkout" onClick={(e) => (hanldepayment(e))}>Payment</button>
                <button className="checkout" onClick={(e) => (onSubmit(e))}>Place order</button>

              </Fragment>)}
            </Fragment>
          )}</Fragment>) : (<Fragment>

            <Calculator total={amount} products={order} />
            <button className="checkout" onClick={(e) => (handleinfo(e))}>  {Name != '' && phone != '' ? (<Fragment>{Name},{phone}</Fragment>) : ('Add Customer Information')}</button>
            <button className="checkout" onClick={(e) => (hanldepayment(e))}>View Cart (Total: £{amount}) </button>
            <button className="checkout" onClick={(e) => (hanldepayment(e))}>Payment</button>
            <button className="checkout" onClick={(e) => (onSubmit(e))}>Place order</button>
          </Fragment>)}


        </div>


      </Fragment>)}
      {loadingfavorder ? ('') : (<Fragment>
        <button className="checkout" onClick={(e) => (handelfav())}>Favourite Dishes </button>
        <div>

          {favorder ? ('') : (<Fragment><ul className='sidenavv__list'>
            {favorderlist ? (<Fragment>
              {favorderlist.map((x, i) => (
                <Fragment>

                  <li className='sidenavv__list-item'>
                    {' '}
                    <div>
                      <p className='product-card-name' onClick={(e) => (openfavdish(x.DishID))}>{' '}{x.Name} </p>
                      <p className="cart-subtotal-amount2">£{x.Dish_Price} </p>
                      <div className="product-qty">

                      </div>
                    </div>
                    <div className="product-card-des">

                    </div> </li>
                </Fragment>
              ))}
            </Fragment>) : ('')}
          </ul></Fragment>)}

        </div>
      </Fragment>)}
      <Print products={order} total={amount} />
    </Fragment>

  );

};

ShoopingcartOwnerdelivery.propTypes = {
  removecart: PropTypes.func.isRequired,
  products: PropTypes.object.isRequired,
  tables: PropTypes.object.isRequired,
  updatecartadd: PropTypes.func.isRequired,
  updatecartminus: PropTypes.func.isRequired,
  addorder: PropTypes.func.isRequired,
  gettables: PropTypes.func.isRequired,
  editorderO: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  owners: PropTypes.object.isRequired,
  loaduser: PropTypes.func.isRequired,
  getfavorder: PropTypes.func.isRequired,
  orders: PropTypes.object.isRequired,
  openfavdish: PropTypes.func.isRequired,
  emptycartorder: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  products: state.products,
  owners: state.owners,
  tables: state.tables,
  orders: state.orders,
});
export default connect(mapStateToProps, { setAlert, emptycartorder, openfavdish, removecart, getfavorder, updatecartadd, loaduser, gettables, updatecartminus, addorder, editorderO })(ShoopingcartOwnerdelivery);