import React, { Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getorder } from '../../actions/order';
import ALLorderUI from './ALLordersUI'

const Allorder = ({
  getorder,
  orders: { orders, loading },
  id
}) => {
  useEffect((id) => {
    getorder(id);
  }, [getorder]);

  //show all order list
  return loading ? (
    <div>Loading ....</div>
  ) : (
    <Fragment>
     
        <table className='servicesT'>
        
        <tbody>
          <tr>
          <th>Order ID</th>
          <th>Date</th>
          <th>Table number</th>
          <th>amount</th>
          <th>status</th>
          <th>Order By</th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          </tr>
    </tbody>
    {orders.map((orders,i) => (
            
            <ALLorderUI
              key={i}
              orders={orders}
              id={id}
            />
          ))}
        
   
        </table>
     
    </Fragment>
  );
};

Allorder.propTypes = {
  getorder: PropTypes.func.isRequired,
  orders: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  orders: state.orders,
});
export default connect(mapStateToProps, { getorder })(Allorder);
