import React, {useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link} from 'react-router-dom';
import { setAlert } from '../../actions/alert';

import PropTypes from 'prop-types';
import { useSelector } from 'react-redux'
import { getdish, Editdish } from '../../actions/dish';

//Edit Form
const Editdishes = ({Editdish,setAlert, getdish, dishes: { dishes, loading }, match, id,rid}) => {
    useEffect(() => {
        getdish(id);
      }, [getdish]);
  
    
  // initial array 
    const [inputList, setInputList] = useState([{ Dish_Name: "", Dish_Description: "", Dish_Price: "",Dish_TakeAway:"",Dish_Delivery:"",ingredients:"",calories:"" }]);
   
    //get the already added menus data from the redux state
 const Menudata = useSelector(state => dishes)

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
    let dishes= inputList
    console.log(dishes)
    Editdish(dishes)
  }

  //  now  render the inital array with the value of manus data 
   return loading ? (
        <div>Loading ....</div>
      ) : (
        <div className='table-wrapper'>
     
       {inputList.length===0?(<p>Add Menu first to Edit!</p>):(<Fragment> <h1 className='large text-center text-primary'>Edit Dish</h1>
        <table className="fl-table">
             
     <thead>
       <tr>
       <th width="50px">#</th>
       <th>Dish_Name</th>
       <th>Dish Description</th>
       <th>Enter Ingredients</th>
       <th>Enter Calories</th>
       <th>Enter Price</th>
       <th>Delivery Price</th>
       <th>TakeAway Price</th>
      
       
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
                name="Dish_Name"
                placeholder="Enter Dish Name"
                value={x.Dish_Name}
                className="form-control form-control-lg"
                onChange={e => handleInputChange(e, i)}
              />
             
          </td>
          <td>
               <textarea
              
               name="Dish_Description"
                placeholder="Enter Dish Description"
                value={x.Dish_Description}
                className="form-control form-control-lg"
                onChange={e => handleInputChange(e, i)}
              />
              </td>
              <td>
               <textarea
              
               name="ingredients"
                placeholder="Enter Ingredients"
                value={x.ingredients}
                className="form-control form-control-lg"
                onChange={e => handleInputChange(e, i)}
              />
              </td>
              <td>
              <input
                type= 'text'
               name="calories"
                placeholder="Enter Calories"
                value={x.calories}
                className="form-control form-control-lg"
                onChange={e => handleInputChange(e, i)}
              />
              </td>
          
           <td>
            <input
                type= 'number'
                name="Dish_Price"
                placeholder="Enter Price"
                value={x.Dish_Price}
                className="form-control form-control-lg"
                onChange={e => handleInputChange(e, i)}
              /> 
            
            </td>
            <td> 
            {' '}
               <input
                type= 'number'
                name="Dish_Delivery"
                placeholder="Enter Delivery Price"
                value={x.Dish_Delivery}
                className="form-control form-control-lg"
                onChange={e => handleInputChange(e, i)}
              /> 
            
            </td>
            <td>
            <input
                type= 'number'
                name="Dish_TakeAway"
                placeholder="Enter TakeAway Price"
                className="form-control form-control-lg"
                value={x.Dish_TakeAway}
                onChange={e => handleInputChange(e, i)}
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

Editdishes.prototype = {
  setAlert: PropTypes.func.isRequired,
  Editdish: PropTypes.func.isRequired,
  getdish: PropTypes.func.isRequired,
  dishes: PropTypes.object.isRequired,
};
const mapStateToprops = (state) => ({
    dishes: state.dishes,
  
});
export default connect(mapStateToprops, { setAlert,Editdish, getdish  })(Editdishes);
