import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {  Redirect } from 'react-router-dom';
import{completeOrder}from '../../actions/shoppingcart'
import { connect } from 'react-redux';
import { getorderdishes } from '../../actions/order';
//show all order UI
const ALLorderlistUI = ({
    orders: { Order_id,Name, date, table_number, amount, status,orderby },
   id,rid,completeOrder,
   products: {  products ,loading },getorderdishes
  
}) => {
  const [edit,setedit] = useState(false);

  const onclick = async (e) => {
    getorderdishes(Order_id);
    setedit(true)
  
  };

if(edit)
{
  return <Redirect to={`/RestuarantMenu/${id}/${rid}`}  />
}
    
    return(
  <tbody>
  <tr>
    <td>{Order_id} </td>
    <td>{date}</td>
    <td>{table_number}</td>
    <td>{amount}</td>
    <td >{status}</td>
    <td>{orderby}</td>

    <td>{status==='pending'?(<button className='btn btn-success my-1' onClick={(e)=>onclick(e)}>
   Edit Order</button>):(<button className='btn btn-success my-1' disabled>
   Edit Order</button>)}</td>
<td><button className='btn btn-success my-1'onClick={(e)=>completeOrder(Order_id)}>
   Free Table</button></td>
   
  </tr>
  
  </tbody>
 
     ) };




ALLorderlistUI.propTypes = {
  
  completeOrder:PropTypes.func.isRequired,
  getorderdishes: PropTypes.func.isRequired,
  products: PropTypes.object.isRequired,}

const mapStateToProps = (state) => ({
  products: state.products
  
});

export default connect(mapStateToProps, {getorderdishes,completeOrder})(ALLorderlistUI);
