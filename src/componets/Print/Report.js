//print component

import React from 'react';
import Moment from 'react-moment';
class Report extends React.Component {

   render() {
    
      console.log(this.props.startDate)
       return (
         <div className='print-source' id='Report'>
          
            <table width="100%"  font-size="13px" cellpadding="0" cellspacing="0" solid="#FF0000">
            <tbody >
            <tr> <th width="100%" align="center">Restaurant </th></tr>
            
            {this.props.endDate===''?( <tr> <th width="100%" align="center">
               
              Day Report ( <Moment format="DD-MM-YYYY">
                  {this.props.startDate}
               </Moment>)</th></tr>):(<tr> <th width="100%" align="center">
               
               <Moment format="DD-MM-YYYY">
                  {this.props.startDate}
               </Moment> to   <Moment format="DD-MM-YYYY">
                  {this.props.endDate}
               </Moment> Report </th></tr>)}

         <tr>
            <tr></tr>
         <table width="100%"  font-size="11px" cellpadding="0" cellspacing="0" solid="#FF0000">
            <tbody >    
       
       

     {this.props.products.map(post => {
       const {Total, Amount,Type,Card,Cash} = post;
       
       return (                     
 <tr>
    <td style={{'borderBottom':'1px solid #000'}}></td>
   <td style={{'borderBottom':'1px solid #000'}}></td>
   <td style={{'borderBottom':'1px solid #000'}}></td>
  <tr>
  <tr>
      <th font-size="13px" >{Type}
      </th>
   </tr>
   <tr>
      <th font-size="11px" align="left">Total Orders: {Total}
      </th>
   </tr>
   <tr>
      <th font-size="11px" align="left">Card Payment: £{Card}
      </th>
   </tr>
   <tr>
      <th font-size="11px" align="left">Cash Payment: £{Cash}
      </th>
   </tr>
   <tr> <th  font-size="11px"  align="left">
      Total Amount:  £{Amount}
   </th></tr>
  
   
</tr>
<tr>


</tr>
 </tr>   
 
       );
     })}

<tr>
   <td style={{'borderBottom':'1px solid #000'}}></td>
   <td style={{'borderBottom':'1px solid #000'}}></td>
   <td style={{'borderBottom':'1px solid #000'}}></td>
</tr>
       </tbody ></table>
       </tr>
 
   </tbody>
   </table>
   
   </div>
        ) };
 };

 export default Report;