import React, {useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import Timer from 'react-compound-timer'
import PropTypes from 'prop-types';
import { getordertodays  } from '../../actions/order';
import { Fragment } from 'react';

//Edit Form
const Todayorderlist= ({setAlert, getordertodays, orders: { orderslist, loadingorderslist }, match}) => {
    useEffect(() => {
        getordertodays();
      }, [getordertodays]);
  
    
  // initial array 
    
  const [showvaration, setshowvaration] = useState(false);


  const hanldevariations = (e) => {
    if(showvaration)
    {
      setshowvaration(false)}
  else{
    setshowvaration(true)
  }
  
   
  } 

  const getsec = (time) => {
    
  
      var a = time.split(':'); // split it at the colons
      var d = new Date(); // for now
     d.getHours(); // => 9
    d.getMinutes(); // =>  30
    d.getSeconds(); // => 51
var bb=d.getHours()+ " : " + d.getMinutes() + " : "+ d.getMinutes()
var b = bb.split(':'); // split it at the colons
      // minutes are worth 60 seconds. Hours are worth 60 minutes.
      var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]); 
    var sec=(+b[0]) * 60 * 60 + (+b[1]) * 60 + (+b[2]); 
     console.log(sec)
      console.log(d)
      console.log(seconds)
      return  seconds
  
  
   
  } 
   
 //submit the data to API
 

  //  now  render the inital array with the value of manus data 
   return loadingorderslist ? (
        <div>Loading ....</div>
      ) : (
      <div>
         <div className='gridd-containerrr'>
        
         {orderslist ===undefined ?'':(
         orderslist.map((order, i) => (
          order.Type==='delivery'?(<Fragment>
<div className='gridd-itemm2'>
                <div className='headerD'>
                <div className='dishelist'>
                <h1>Delivery</h1> 
                <p>#{order.Order_id}   | {order.Customer_Name} |    {<Timer
                
    initialTime={getsec(order.time)}
    lastUnit="h"
 
>
    {() => (
        <React.Fragment>
          <Timer.Hours />:
            <Timer.Minutes />:
            <Timer.Seconds /> 
        </React.Fragment>
    )}
</Timer>}</p>
                </div>
                </div>
                {order.dishes===undefined?'':(<Fragment> {order.dishes.map((x,j)=>(
                  <Fragment>
                    <div className='dishelist'onClick={(e)=>hanldevariations(e)} >
                    <h4>{x.Qty}   {x.Name}</h4>
                    {x.variation===undefined?'':(<Fragment>{showvaration? (<Fragment><Fragment> {x.variation.map((y,p)=>(
                  <Fragment>
                   <p>- {y.Name}</p>
                  </Fragment>
                ))}</Fragment></Fragment>):('')}</Fragment>)}
                    </div>
                    <hr></hr>
                  </Fragment>
                ))}</Fragment>)}
               
         
         
          </div>
          </Fragment>):(<Fragment>{order.Type==='dine-in'?(<Fragment>
            <div className='gridd-itemm2'>
                <div className='headerIN'>
                <div className='dishelist'>
                <h1>Table {order.table_number}</h1> 
                <p>#{order.Order_id}   | {order.Customer_Name} | {<Timer
                
                initialTime={getsec(order.time)}
                lastUnit="h"
             
            >
                {() => (
                    <React.Fragment>
                      <Timer.Hours />:
                        <Timer.Minutes />:
                        <Timer.Seconds /> 
                    </React.Fragment>
                )}
            </Timer>}</p>
                </div>
                </div>
                {order.dishes===undefined?'':(<Fragment> {order.dishes.map((x,j)=>(
                  <Fragment>
                    <div className='dishelist'onClick={(e)=>hanldevariations(e)} >
                    <h4>{x.Qty}   {x.Name}</h4>
                    {x.variation===undefined?'':(<Fragment>{showvaration? (<Fragment><Fragment> {x.variation.map((y,p)=>(
                  <Fragment>
                   <p>- {y.Name}</p>
                  </Fragment>
                ))}</Fragment></Fragment>):('')}</Fragment>)}
                    </div>
                    <hr></hr>
                  </Fragment>
                ))}</Fragment>)}
               
              
         
          </div>
          </Fragment>):(<Fragment>
            <div className='gridd-itemm2'>
                <div className='headerT'>
                <div className='dishelist'>
                <h1>Takeaway</h1> 
                <p>#{order.Order_id}   | {order.Customer_Name} | {<Timer
                
                initialTime={getsec(order.time)}
                lastUnit="h"
             
            >
                {() => (
                    <React.Fragment>
                      <Timer.Hours />:
                        <Timer.Minutes />:
                        <Timer.Seconds /> 
                    </React.Fragment>
                )}
            </Timer>}</p>
                </div>
                </div>
                {order.dishes===undefined?'':(<Fragment> {order.dishes.map((x,j)=>(
                  <Fragment>
                    <div className='dishelist'onClick={(e)=>hanldevariations(e)} >
                    <h4>{x.Qty}   {x.Name}</h4>
                    {x.variation===undefined?'':(<Fragment>{showvaration? (<Fragment><Fragment> {x.variation.map((y,p)=>(
                  <Fragment>
                   <p>- {y.Name}</p>
                  </Fragment>
                ))}</Fragment></Fragment>):('')}</Fragment>)}
                    </div>
                    <hr></hr>
                  </Fragment>
                ))}</Fragment>)}
              
         
          </div>
          </Fragment>)}</Fragment>)
         )))}


        
    
      
      </div>
     
       
      </div>

  );
};

Todayorderlist.prototype = {
  setAlert: PropTypes.func.isRequired,

  getordertodays: PropTypes.func.isRequired,
  orders: PropTypes.object.isRequired,
};
const mapStateToprops = (state) => ({
    orders: state.orders,
  
});
export default connect(mapStateToprops, { setAlert, getordertodays  })(Todayorderlist);
