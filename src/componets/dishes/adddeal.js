import React, { Fragment, useState,useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import{adddealdish,getAlldish}from '../../actions/dish'
import PropTypes from 'prop-types';
import Select from 'react-select';


//Add deal Form
const ADDdeal = ({adddealdish,setAlert, getAlldish,match,ALL_dishes: { ALL_dishes, loadingdishes }}) => {
  useEffect(() => {
    getAlldish(match.params.rid);
  }, [getAlldish]);
    const [inputList, setInputList] = useState([{ Dish_Name: "", Dish_Description: "", Dish_Price: "", ResturantID: match.params.rid,TakeAway:"",Delivery:"",ingredients:"",calories:"",selected: [] }]);
    const [multiselect, setmultiselect] = useState([]);
 
    // handle input change
    const handleInputChange = (e, index) => {
      const { name, value } = e.target;
      const list = [...inputList];
      list[index][name] = value;
      setInputList(list);
    };

    // handle click event of the Add button
    const handleAddClick = (i) => {
      
      if(inputList[i].Dish_Description ===''){
        setAlert('Please Fill all the required fields', 'danger');
        
      }
      if(inputList[i].Dish_Name ===''){
        setAlert('Please Fill all the required fields', 'danger');
        
      }
      if(inputList[i].Dish_Price ===''){
        setAlert('Please Fill all the required fields', 'danger');
        
      }
      if(inputList[i].TakeAway ===''){
        setAlert('Please Fill all the required fields', 'danger');
        
      }
      if(inputList[i].Delivery ===''){
        setAlert('Please Fill all the required fields', 'danger');
        
      }
       if(inputList[i].Dish_Name  && inputList[i].Dish_Description !==""){
       
        const list = [...inputList];
        list[i]["selected"] = multiselect;
        setInputList(list);
        console.log(inputList)
        setmultiselect([])
      setInputList([...inputList, { Dish_Name: "", Dish_Description: "", Dish_Price: "", ResturantID: "1",TakeAway:"",Delivery:"" }]);
      }
    };
    const onSubmit = async (e) => {
      e.preventDefault();
      let x=0;
      let i;

      //validation if all the feilds are filled when submit button is clicked
      for(i=0;i<inputList.length;i++)
      {
        if(inputList[i].Dish_Name ===''){
          
          x++;
        }
        if(inputList[i].Dish_Description ===''){
          
          x++;
        }
        if(inputList[i].Dish_Price ===''){
          
          x++;
        }

      }
      if(x>0)
      {  setAlert('Please add all the required field to submit', 'danger');
    }
      else{
   //send the data to API
   if(inputList.length===1)
   {
    const list = [...inputList];
    let selected=multiselect
    list[0]["selected"] = selected;
  
    setInputList(list);
    console.log(inputList)
   }
   
  
   setmultiselect([])
   setInputList([{ Dish_Name: "", Dish_Description: "", Dish_Price: "", ResturantID: match.params.rid,TakeAway:"",Delivery:"",ingredients:"",calories:"",selected: [] }])
       let dishes=inputList
           adddealdish(dishes,match.params.id)
      };
    };
  
    return loadingdishes ? (
      <div>Loading ....</div>
    ) : (
      <div className='containerBB'>
      <div className='cardBB'>
         <h1 className='large text-primary'>Add Dish </h1>
        {inputList.map((x, i) => {
          return (
            <div className='form'>
              
          
          <div className= 'form-group'>
            <p>no: {i+1}</p>
              <input
                type= 'text'
                name="Dish_Name"
                placeholder="Enter Deal Name"
                value={x.Dish_Name}
                onChange={e => handleInputChange(e, i)}
              />
              </div>

              <div className= 'form-group'>             
              
          <Select
            isMulti
            className='lead'
            options={
              ([] = ALL_dishes.map(function (ALL_dishes, i) {
                return {
                  value: ALL_dishes.Dish_Name,
                  label: ALL_dishes.Dish_Name,
                  DishId: ALL_dishes.Dish_id
                };
              }))
            }
           
            value={multiselect}
            onChange={setmultiselect}
            labelledBy={'multiselect'}
          />
              
              
              
              
              </div>
              <div className= 'form-group'>
            {' '}
               <input
                type= 'number'
                name="Dish_Price"
                placeholder="Enter Price"
                value={x.Dish_Price}
                onChange={e => handleInputChange(e, i)}
              /> 
            
              </div>
              <div className= 'form-group'>
            {' '}
               <input
                type= 'number'
                name="TakeAway"
                placeholder="Enter TakeAway Price"
                value={x.TakeAway}
                onChange={e => handleInputChange(e, i)}
              /> 
            
              </div>
              <div className= 'form-group'>
            {' '}
               <input
                type= 'number'
                name="Delivery"
                placeholder="Enter Delivery Price"
                value={x.Delivery}
                onChange={e => handleInputChange(e, i)}
              /> 
            
              </div>
              <div className='form'>
               <div className='form-group'>
               <textarea
              
               name="Dish_Description"
                placeholder="Enter Dish Description"
                value={x.Dish_Description}
                onChange={e => handleInputChange(e, i)}
              />
              </div>

              <div className='form-group'>
               <textarea
              
               name="ingredients"
                placeholder="Enter Ingredients"
                value={x.ingredients}
                onChange={e => handleInputChange(e, i)}
              />
              </div>
              <div className='form-group'>
              <input
                type= 'text'
               name="calories"
                placeholder="Enter Calories"
                value={x.calories}
                onChange={e => handleInputChange(e, i)}
              />
              </div>

           
              <div className='form-group'>
                {inputList[i].Dish_Name || inputList[i].Dish_Description===!'' ? <Fragment> {inputList.length - 1 === i && <button  className='btnn btn-primary'onClick={(e) =>handleAddClick(i)}> Add More</button>}</Fragment>: <Fragment><button  className='btnn btn-primary'   disabled  > Add More</button></Fragment>}
              
              </div>
            
            </div>
            </div>
          );
        })}
       
       <button  className='btn btn-primary-submit' onClick={(e) =>onSubmit(e)}>Submit</button>
       <Link to={`/dashboard/${match.params.rid}`}>go back</Link>
      </div>
      </div>

);
};
ADDdeal.prototype = {
  setAlert: PropTypes.func.isRequired,
  adddealdish: PropTypes.func.isRequired,
  getAlldish: PropTypes.func.isRequired,
  ALL_dishes: PropTypes.object.isRequired,
};
const mapStateToprops = (state) => ({
  ALL_dishes: state.ALL_dishes,
});
export default connect(mapStateToprops, { setAlert,adddealdish,getAlldish })(ADDdeal);

