import React, { useState, Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setAlert } from '../actions/alert';
import{Variationlink, gettype, gettypecount}from '../actions/variations'
import PropTypes from 'prop-types';

//Add dish Form
const LinkVariation = ({Variationlink,gettype,gettypecount,rid,id,setAlert, match, variations: { variations,loading_count,variations_count ,loading }}) => {
  useEffect(() => {
    gettype(rid);
  }, [gettype]);
  console.log(rid)
    const [inputList, setInputList] = useState([{ no_of_varation_allowed: "", typeID: "", Type: ""  }]);


    // handle input change
    const handleInputChange = (e, index) => {
      const { name, value } = e.target;
      const list = [...inputList];
      list[index][name] = value;
      if(name=='Type')
      {
        handleInputChangeType(e,index,value)
        
      }
      setInputList(list);
     
    };
console.log(inputList)
    const handleInputChangeType = (e, index,value) => {
     var x= variations.x.filter(item => item.Name === value);
    console.log(x[0].varation_type_id)

      
      const list = [...inputList];
      list[index]['typeID'] = x[0].varation_type_id;
       setInputList(list);
       gettypecount(x[0].varation_type_id)
    };
    console.log(variations)
    // handle click event of the Add button
    const handleAddClick = (i) => {
      
     
    
     
       if( inputList[i].Price !==""){
       
      setInputList([...inputList, {  no_of_varation_allowed: "", typeID: "", Type: ""  }]);
      }
    };
    const onSubmit = async (e) => {
      e.preventDefault();
     
      let x=0;
      let msg=''
      let i=0;
      console.log(inputList)
      //validation if all the feilds are filled when submit button is clicked
      for(i=0;i<inputList.length;i++)
      {
        if(inputList[i].no_of_varation_allowed ===''){
          
          x++;
          msg=msg+`Please select no of Variation Allowed. `
        }
        if(inputList[i].Type ===''){
          
          x++;
          msg=msg+`Please Select Type. `
        }
       
       

      }
      if(x>0)
      {  setAlert(`${msg}`, 'danger');
    }
    else{
      
   //send the data to API
   let varation=inputList
      setAlert('Variation LInked', 'success');
      Variationlink(varation,id)
    }
     
    };
  
    return loading ? (
      <div>Loading ....</div>
    ) : (
      <div className='containerLBB'>
  {variations.x.length===0?(<Fragment>
    <div className='form'>Add Some Variations First To Continue!
    <Link to={`/AddVariationtype/${rid}`} className='btn btn-primary-submit'>
         Variations
         </Link>
         </div>
  </Fragment>):(  
      <div>
        
        {inputList.map((x, i) => {
          return (
            <div className='form'>
         
            <p>no: {i+1}</p>
       
               <div className='form-group'>

               <select  name='Type'   value={x.Type}
                onChange={e => handleInputChange(e, i)}>
                   <option value='0'>* Select a type</option>
                  {  variations.x.map((item,i) => {
                   
                    return (
                      
                        <option value={item.Name} >{item.Name}</option>
                        )
                    })}
               
  </select>
  </div>
             
              <div className='form-group'>

              <select   type= 'number' name='no_of_varation_allowed'   value={x.no_of_varation_allowed}
                onChange={e => handleInputChange(e, i)}>
                   <option value='0'>* Select No of Variation Allowed</option>
                  {loading_count?(<option>loading....</option>):(<Fragment>{variations_count.results.map((item,i) => {
                   
                   return (
                     
                       <option value={i+1} >{i+1}</option>
                       )
                   })}</Fragment>)}  
               
             </select>
            
              </div>
    
            
            </div>
        
          );
        })}
       
       <button  className='btn btn-primary-submit' onClick={(e) =>onSubmit(e)}>Submit</button>
      
      </div>)}
      </div>

  );
};

LinkVariation.prototype = {
  setAlert: PropTypes.func.isRequired,
  gettype: PropTypes.func.isRequired,
  Variationlink: PropTypes.func.isRequired,
  variations: PropTypes.object.isRequired,
  gettypecount: PropTypes.func.isRequired

};
const mapStateToprops = (state) => ({
  variations: state.variations,
});
export default connect(mapStateToprops, {gettype, setAlert, Variationlink,gettypecount })(LinkVariation);

