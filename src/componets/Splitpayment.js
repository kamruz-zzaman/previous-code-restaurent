import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setAlert } from '../actions/alert';
import { adddish } from '../actions/dish'
import PropTypes from 'prop-types';

//Add dish Form
const Split = ({ adddish, setAlert, match, amount }) => {
  const [divide, setdivide] = useState(2)
  const [inputList, setInputList] = useState([{ Cash: "", Card: "", Total: +amount / 2 }, { Cash: "", Card: "", Total: +amount / 2 }]);
  const [errorMessage, setErrorMessage] = React.useState("");
  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = (i) => {

    //if(inputList[i].Card ===''){
    // setAlert('Please Fill all the required fields', 'danger');

    //}
    // if(inputList[i].Cash ===''){
    // setAlert('Please Fill all the required fields', 'danger');

    // }

    // if(inputList[i].Cash  && inputList[i].Card !==""){
    setdivide(divide + 1)
    setInputList([...inputList, { Cash: "", Card: "", Total: +amount / 2 }]);
    // }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    let x = 0;
    let i;
    //validation if all the feilds are filled when submit button is clicked
    for (i = 0; i < inputList.length; i++) {
      x = x + +inputList[i].Total



    }
    console.log(x)
    if (x > amount) {
      setErrorMessage("The pay amount is greater then the Total Amount")
      setAlert('The pay amount in greater then the Total Amount', 'danger');
    }
    else {
      //send the data to API
      let dishes = inputList
      setErrorMessage("")
      //  adddish(dishes,match.params.id)
    };
  };

  return (
    <div >
      <div className='text-center'>
        {errorMessage && <div className="error"> {errorMessage} </div>}
        <h1 className='text-dark'><i className="fas fa-minus"></i> {inputList.length} <i className="fas fa-plus" onClick={(e) => handleAddClick()} ></i> </h1>
        <small>Payments</small>
        {inputList.map((x, i) => {
          return (
            <div className='form-inline'>

              <div className='ck-buttonK'>
                <label >
                  <input type="checkbox" name='variationID'
                    defaultChecked={false}
                  />

                  <span >Cash</span>
                </label>
              </div>
              <div className='ck-buttonK'>
                <label >
                  <input type="checkbox" name='variationID'
                    defaultChecked={false}
                  />

                  <span >Card</span>
                </label>
              </div>

              {' '}

              <input
                type='number'
                name="Total"
                placeholder="Enter Card"
                value={x.Total}
                onChange={e => handleInputChange(e, i)}
              />










            </div>
          );
        })}

        <button className='btn btn-primary-submit' onClick={(e) => onSubmit(e)}>Done</button>

      </div>
    </div>

  );
};

Split.prototype = {
  setAlert: PropTypes.func.isRequired,
  adddish: PropTypes.func.isRequired,
};
const mapStateToprops = (state) => ({

});
export default connect(mapStateToprops, { setAlert, adddish })(Split);

