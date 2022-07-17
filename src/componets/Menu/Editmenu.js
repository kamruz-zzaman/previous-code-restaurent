import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import{Editmenu, getmenu}from '../../actions/menu'
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux'
import { Link} from 'react-router-dom';
//Edit Form
const EditMenu = ({Editmenu,id,setAlert, getmenu, menus: { menus, loading }, match}) => {
     
  useEffect(() => {
    getmenu(id);
   
  }, [getmenu]);

  
    
  // initial array 
    const [inputList, setInputList] = useState([{ Menu_Name: "", Menu_Description: "", Menu_id: "", Totaldishes: "" }]);
   
    //get the already added menus data from the redux state
    const Menudata = useSelector(state => menus)

   //now set this array into your initial array
    useEffect(() => {
      setInputList(Menudata)
     
    }, );

    // handle input change
    const handleInputChange = (e, index) => {
     
      const { name, value } = e.target;
      const list = [...inputList];
      list[index][name] = value;
      setInputList(list);
     
      
    };

    
   
 //submit the data to API
    const onSubmit = async (e) => {
      e.preventDefault();
    let menu= inputList
    Editmenu(menu)
  }

  //  now  render the inital array with the value of manus data 
   return loading ? (
        <div>Loading ....</div>
      ) : (
        <div className='table-wrapper'>
     
        
      {inputList.length===0?(<p>Add Menu first to Edit!</p>):(<Fragment><h1 className='large text-center text-primary'>Edit Dish</h1>  <table className="fl-table">
             
             <thead>
               <tr>
               <th width="50px">#</th>
               <th>Menu Name</th>
               <th>Menu_Description</th>
               
               <th></th>
               </tr>
         </thead>
              
                 {inputList ===undefined ?'':(
                 inputList.map((x, i) => {
                  return (
                   
                   
                         
                    <tbody>
                    <tr>
                    <td>
           {i+1}
            </td>
                      <td>
                      <input
                        type= 'text'
                        name="Menu_Name"
                        placeholder="Enter Menu Name"
                        value={x.Menu_Name}
                        className="form-control form-control-lg"
                         //set the changes in the inital state
                        onChange={e => handleInputChange(e, i)}
                        required
                      />
                     
                      </td>
                      <td>
                      
                      
                       <textarea
                      
                       name="Menu_Description"
                        placeholder="Enter Menu Description"
                        value={x.Menu_Description}
                        //set the changes in the inital state
                        className="form-control form-control-lg"
                        onChange={e => handleInputChange(e, i)}
                        required
                      />
                      </td>
                       </tr>
                        </tbody>
                      
                    
                  );
                }))}
               
                  <button  className='btn btn-primary-submit' onClick={(e) =>onSubmit(e)}>Save changes</button>
                  
               </table></Fragment>)}
      </div>

  );
};

EditMenu.prototype = {
  setAlert: PropTypes.func.isRequired,
  Editmenu: PropTypes.func.isRequired,
  getmenu: PropTypes.func.isRequired,
  menus: PropTypes.object.isRequired,
};
const mapStateToprops = (state) => ({
    menus: state.menus,
  
});
export default connect(mapStateToprops, { setAlert,Editmenu, getmenu  })(EditMenu);
