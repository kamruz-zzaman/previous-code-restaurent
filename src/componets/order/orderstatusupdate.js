import React, { useState } from 'react';
import { connect } from 'react-redux';

import { setAlert } from '../../actions/alert';
//import Timer from 'react-compound-timer'
import PropTypes from 'prop-types';

import { getordertodays } from '../../actions/order';
import { Fragment } from 'react';
import Orderlist from './ALLorders'


//Edit Form
const Orderstatusupdate = ({ setAlert, getordertodays, orders: { orderslist, loadingorderslist }, match }) => {



  // initial array 
  console.log("hellocon")
  const [showdelivery, setshowdelivery] = useState(false);
  const [showtakeaway, setshowtakeaway] = useState(false);
  const [showdinein, setshowdinein] = useState(false);



  const handledelivery = (e) => {
    if (showdelivery) {
      setshowdelivery(false)
    }
    else {
      setshowdelivery(true)
    }


  }

  const handletakeaway = (e) => {
    if (showtakeaway) {
      setshowtakeaway(false)
    }
    else {
      setshowtakeaway(true)
    }


  }

  const handledinein = (e) => {
    if (showdinein) {
      setshowdinein(false)
    }
    else {
      setshowdinein(true)
    }


  }

  const getsec = (time) => {


    var a = time.split(':'); // split it at the colons
    var d = new Date(); // for now
    d.getHours(); // => 9
    d.getMinutes(); // =>  30
    d.getSeconds(); // => 51
    var bb = d.getHours() + " : " + d.getMinutes() + " : " + d.getMinutes()
    var b = bb.split(':'); // split it at the colons
    // minutes are worth 60 seconds. Hours are worth 60 minutes.
    var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
    var sec = (+b[0]) * 60 * 60 + (+b[1]) * 60 + (+b[2]);
    console.log(sec)
    console.log(d)
    console.log(seconds)
    return seconds



  }

  //submit the data to API


  //  now  render the inital array with the value of manus data 
  return (


    <div className='containerFO'>


      <div >
        <button className="btnnnO" onClick={(e) => handledelivery()} >Delivery</button>
        {showdelivery ? (<Fragment>
          <Orderlist id={9} />
        </Fragment>) : (null)}
        <button className="btnnnO" onClick={(e) => handletakeaway()} >Takeaway</button>
        {showtakeaway ? (<Fragment>
          <Orderlist id={9} />
        </Fragment>) : (null)}
        <button className="btnnnO" onClick={(e) => handledinein()} >Dine-In</button>
        {showdinein ? (<Fragment>
          <Orderlist id={9} />
        </Fragment>) : (null)}

      </div>


    </div>

  );
};

Orderstatusupdate.prototype = {
  setAlert: PropTypes.func.isRequired,

  getordertodays: PropTypes.func.isRequired,
  orders: PropTypes.object.isRequired,
};
const mapStateToprops = (state) => ({
  orders: state.orders,

});
export default connect(mapStateToprops, { setAlert, getordertodays })(Orderstatusupdate);
