import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setAlert } from '../actions/alert';
import { addvariationtype } from '../actions/variations'
import PropTypes from 'prop-types';

//Add dish Form
const ADDVariation = ({ addvariationtype, setAlert, match, id }) => {
  const [inputList, setInputList] = useState([{ Name: "", description: "" }]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = (y) => {

    let x = 0;
    let i;
    let msg = '';
    //validation if all the feilds are filled when submit button is clicked
    for (i = 0; i < inputList.length; i++) {
      if (inputList[i].Name === '') {

        x++;
        msg = msg + `Please add a variation Name at row no: ${i + 1}. `
      }
      if (inputList[i].description === '') {

        x++;
        msg = msg + `Please add a variation description at row no: ${i + 1}. `
      }


    }
    if (x > 0) {
      setAlert(`${msg}`, 'danger');
    }
    else {
      //send the data to API
      setInputList([...inputList, { Name: "", description: "" }]);
    };


  };
  const handledeleteClick = (i) => {

    const list2 = [...inputList];
    list2.splice(i, 1);
    setInputList(list2);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    let x = 0;
    let i;
    let msg = ''
    //validation if all the feilds are filled when submit button is clicked
    for (i = 0; i < inputList.length; i++) {
      if (inputList[i].Name === '') {

        x++;
        msg = msg + `Please add a variation Name at row no: ${i + 1}. `
      }
      if (inputList[i].description === '') {

        x++;
        msg = msg + `Please add a variation description at row no: ${i + 1}. `
      }



    }
    if (x > 0) {
      setAlert(`${msg}`, 'danger');
    }
    else {
      //send the data to API
      let VarationType = inputList
      addvariationtype(VarationType, id)
      setInputList([{ Name: "", description: "" }])

    };
  };

  return (
    <div className='table-wrapper' >

      <h1 className='large text-center text-primary'>Add Variation Type</h1>
      <table className="fl-table">

        <thead>
          <tr>
            <th width="120px">#</th>
            <th>Variation Name</th>
            <th>Variation Description</th>
            <th></th>
            <th>Add more</th>
          </tr>
        </thead>

        {inputList.map((x, i) => {
          return (

            <tbody>
              <tr>
                <td>
                  {i + 1}
                </td>
                <td>



                  <input
                    className="form-control"
                    type='text'
                    name="Name"
                    placeholder="Enter Name"
                    value={x.Name}
                    onChange={e => handleInputChange(e, i)}
                  />

                  {' '}

                </td>
                <td>
                  <textarea
                    className="form-control"
                    name="description"
                    placeholder="Enter  Description"
                    value={x.description}
                    rows={1}
                    onChange={e => handleInputChange(e, i)}
                  />

                </td>

                <td>{i > 0 ? (<i className="fas fa-trash-alt largei" onClick={(e) => handledeleteClick(i)}></i>) : ('')}</td>
                <td>
                  {inputList[i].Name || inputList[i].description === !'' ? <Fragment> {inputList.length - 1 === i && <button className='btn btn-primary2' onClick={(e) => handleAddClick(i)}> Add More</button>}</Fragment> : <Fragment><button className='btn btn-primary2' disabled  > Add More</button></Fragment>}
                </td>



              </tr>
            </tbody>

          );
        })}

        <button className='btn btn-primary' onClick={(e) => onSubmit(e)}>Submit</button>

      </table>
    </div>


  );
};

ADDVariation.prototype = {
  setAlert: PropTypes.func.isRequired,
  addvariationtype: PropTypes.func.isRequired,
};
const mapStateToprops = (state) => ({

});
export default connect(mapStateToprops, { setAlert, addvariationtype })(ADDVariation);

