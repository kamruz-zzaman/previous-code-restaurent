import React, { Fragment,useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getorderreport } from '../../actions/order';
import ALLorderUI from './AllorderlistsearchUI'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Print from '../Print/Report';
const AllorderList = ({

  orders: { orders, loading },
  startDate,
  endDate

}) => {
  const [Orderdata, setOrderdata] = useState([
    {
      Total:   0,
      Amount:  0,
      Card:0,
      Cash:0,
      Type: "Overall Report"
      
    },
    {
      Total:   0,
      Amount:  0,
      Card:0,
      Cash:0,
      Type: "Takeway Details"
    },
    {
      Total:   0,
      Amount:  0,
      Card:0,
      Cash:0,
      Type: "EatIn Details"
    },
    {
      Total:   0,
      Amount:  0,
      Card:0,
      Cash:0,
      Type: "Delivery Details"
    }

  ]);
  const [Reportcalculated, setReportcalculated] = useState(false);
  

  const handlePrint = (e)=>{
    
    report(e)
    if(Reportcalculated){
      var mywindow = window.open("", "PRINT", "height=400,width=600");
  
    mywindow.document.write(
      "<html><head><title></title>"
    );
    mywindow.document.write("</head><body >");
   
   // mywindow.document.write();
     mywindow.document.write(document.getElementById('Report').innerHTML);
    mywindow.document.write("</body></html>");
  
    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/
  
    mywindow.print();
   mywindow.close();
    }
   
    
    }

    

   const report= (e)=>{
     if(!loading){
     let T=0
       for(let i=0;i<orders.result.length;i++)
       {
        const list = [...Orderdata];
        if(orders.result[i].Type=='Takeaway'){
          console.log('helloT')
          console.log(orders.result[i].amount)

          list[0]['Total']=list[0]['Total'] +1
          list[0]['Amount']= list[0]['Amount'] + +orders.result[i].amount
          list[1]['Total']=list[1]['Total'] +1
          list[1]['Amount']= list[1]['Amount'] + +orders.result[i].amount
      
        list[1]['Card']= list[1]['Card'] + +orders.result[i].Card
        list[0]['Card']= list[0]['Card'] + +orders.result[i].Card

       
      
     
        list[1]['Cash']= list[1]['Cash'] + +orders.result[i].Cash
        list[0]['Cash']= list[0]['Cash'] + +orders.result[i].Cash
      
          setOrderdata(list);
         
          console.log(list[1]['AmountT'])
        }

       else if(orders.result[i].Type=='Delivery'){
        list[0]['Total']=list[0]['Total'] +1
        list[0]['Amount']= list[0]['Amount'] + +orders.result[i].amount
        list[3]['Total']=list[3]['Total'] +1
        list[3]['Amount']= list[3]['Amount'] + +orders.result[i].amount
        
         list[3]['Card']= list[3]['Card'] + +orders.result[i].Card
         list[0]['Card']= list[0]['Card'] + +orders.result[i].Card
        
        
         list[3]['Cash']= list[3]['Cash'] + +orders.result[i].Cash
         list[0]['Cash']= list[0]['Cash'] + +orders.result[i].Cash
       
        setOrderdata(list); 
      }

       else if(orders.result[i].Type=='DineIn'){
        list[0]['Total']=list[0]['Total'] +1
        list[0]['Amount']= list[0]['Amount'] + +orders.result[i].amount
        list[2]['Total']=list[2]['Total'] +1
        list[2]['Amount']= list[2]['Amount'] + +orders.result[i].amount
       
         list[2]['Card']= list[2]['Card'] + +orders.result[i].Card
         list[0]['Card']= list[0]['Card'] + +orders.result[i].Card
       
         list[2]['Cash']= list[2]['Cash'] + +orders.result[i].Cash
         list[0]['Cash']= list[0]['Cash'] + +orders.result[i].Cash
        
        setOrderdata(list);    
      }

      if(i+1<=orders.result.length){
        setReportcalculated(true)
       }
      }
     }

   }




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
        <button className='btn btn-primary my-1' onClick={(e) => (handlePrint(e))}>Print</button>
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
      <Print  products={Orderdata}  startDate={startDate} endDate={endDate} /> 
    </Fragment>
  );
};

AllorderList.propTypes = {
  getorderreport: PropTypes.func.isRequired,
  orders: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  orders: state.orders,
});
export default connect(mapStateToProps, { getorderreport })(AllorderList);
