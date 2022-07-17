//print component

import React, { Fragment } from 'react';
class Print extends React.Component {
   render() {
       return (
         <div className='print-source' id='kitchen'>
          
            <table width="320px"  font-size="13px" cellpadding="0" cellspacing="0" solid="#FF0000">
            <tbody >
            <tr> <th width="100%" align="center">Restaurant </th></tr>
            <tr> <th width="100%" align="center">kitchen Receipt </th></tr>
            <tr>
   <td style={{'borderBottom':'1px solid #000'}}></td>
   <td style={{'borderBottom':'1px solid #000'}}></td>
   <td style={{'borderBottom':'1px solid #000'}}></td>
</tr>
            <tr> <th align="left" >Order ID: 1 </th></tr>
            <tr>
   <td style={{'borderBottom':'1px solid #000'}}></td>
   <td style={{'borderBottom':'1px solid #000'}}></td>
   <td style={{'borderBottom':'1px solid #000'}}></td>
</tr>
         <tr>
         <table width="320px"  font-size="13px" cellpadding="0" cellspacing="0" solid="#FF0000">
            <tbody >    
              <tr>    
         <th width="30%" align="left" >Product Name</th>
           <th width="20%"  align="left">QTY</th>
           
           <th width="1%" align="left">Price</th>
           </tr> 
       
         <tr >
   <td style={{'borderBottom':'1px solid #000'}}></td>
   <td style={{'borderBottom':'1px solid #000'}}></td>
   <td style={{'borderBottom':'1px solid #000'}}></td>
</tr>
     {this.props.products.map(post => {
       const { Name, Qty, variation,Dish_Price,Type} = post;
       
       return (                     
 <tr>
  <tr>
   <td>{Name}
   
   </td>
   <td>{Qty}</td>
  
   <td>£{Dish_Price}</td>
</tr>
<tr>

{Type==='deal'?(<p>{variation}</p>):(<Fragment> 
    {//show the variations 
       variation ?(variation.map(products =>{
         const { variation_Name } = products;
       
         return (
           <tr>
     <td> -{variation_Name}</td>
     </tr>
         )
         
       })) :('')}
       </Fragment>)}
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

 export default Print;