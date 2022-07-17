import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getorderreportbyowner } from '../../actions/order';
import ALLorderUI from './AllorderlistsearchUI'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
const AllorderListowner = ({
  getorderreportbyowner,
  orders: { orders, loading },
  value, startDate,endDate, status,
  id
}) => {
  useEffect(() => {
    getorderreportbyowner(startDate,endDate,0,value,status,id);
  }, [getorderreportbyowner]);

  console.log(startDate)
  //show all order list
  return loading ? (
    <div>Loading ....</div>
  ) : (
    <Fragment>
      <div>
      <div>
          {' '}
          <h4 className='lead'>Search Result</h4>
        </div>
        <ReactHTMLTableToExcel
          id='test-table-xls-button'
          className='btn btn-primary my-1'
          table='table-to-xls'
          filename='tablexls'
          sheet='tablexls'
          buttonText='Download as XLS'
        />
        
        <table id='table-to-xls'className='servicesT'>
      
        <tbody>
          <tr>
          <th>Restaurant Name</th>
          <th>Date</th>
          <th>Table number</th>
          <th>amount</th>
          <th>status</th>
          <th>view</th>
          
          </tr>
    </tbody>
    {orders.result.map((orders,i) => (
            
            <ALLorderUI
              key={i}
              orders={orders}
              
            />
          ))}
        
   
        </table>
      </div>
    </Fragment>
  );
};

AllorderListowner.propTypes = {
  getorderreportbyowner: PropTypes.func.isRequired,
  orders: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  orders: state.orders,
});
export default connect(mapStateToProps, { getorderreportbyowner })(AllorderListowner);
