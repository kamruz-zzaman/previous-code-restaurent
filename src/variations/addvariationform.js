import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setAlert } from '../actions/alert';
import { addvariation, gettype } from '../actions/variations'
import PropTypes from 'prop-types';

//Add dish Form
const ADDVariation = ({ addvariation, gettype, setAlert, id, match, variations: { variations, loading } }) => {


  const [inputList, setInputList] = useState([{ Name: "", description: "", Type: "", typeID: id, Price: "" }]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    if (name == 'Type') {
      handleInputChangeType(e, index, value)
    }
    setInputList(list);
  };
  const handledeleteClick = (i) => {

    const list2 = [...inputList];
    list2.splice(i, 1);
    setInputList(list2);
  };
  const handleInputChangeType = (e, index, value) => {
    var x = variations.results.filter(item => item.Name === value);
    console.log(x[0].varation_type_id)


    const list = [...inputList];
    list[index]['typeID'] = x[0].varation_type_id;
    setInputList(list);

  };

  console.log(inputList)
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
      if (inputList[i].Price === '') {

        x++;
        msg = msg + `Please add a variation price at row no: ${i + 1}. `
      }


    }
    if (x > 0) {
      setAlert(`${msg}`, 'danger');
    }
    else {
      //send the data to API
      setInputList([...inputList, { Name: "", description: "", Type: "", typeID: id, Price: "" }]);
    };


  };
  const onSubmit = async (e) => {
    e.preventDefault();
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
      if (inputList[i].Price === '') {

        x++;
        msg = msg + `Please add a variation price at row no: ${i + 1}. `
      }

    }
    if (x > 0) {
      setAlert(`${msg}`, 'danger');
    }
    else {
      //send the data to API
      let varation = inputList
      addvariation(varation)
      setInputList([{ Name: "", description: "", Type: "", typeID: id, Price: "" }])

    };
  };

  return (
    <div className='table-wrapper'>

      <h1 className='large text-center text-primary'>ADD variation</h1>
      <table className="fl-table">

        <thead>
          <tr>
            <th width="120px">#</th>

            <th>Name</th>
            <th>description</th>
            <th>Price</th>
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
                    type='text'
                    name="Name"
                    placeholder="Enter variation Name"
                    value={x.Name}
                    className="form-control"
                    onChange={e => handleInputChange(e, i)}
                  />

                </td>
                <td>

                  <textarea

                    name="description"
                    placeholder="Enter Description"
                    value={x.description}
                    className="form-control"
                    rows={1}
                    onChange={e => handleInputChange(e, i)}
                  />

                </td>
                <td>

                  <input
                    type='number'
                    name="Price"
                    placeholder="Enter Price"
                    value={x.Price}
                    className="form-control"
                    onChange={e => handleInputChange(e, i)}
                  />

                </td>
                <td>{i > 0 ? (<i className="fas fa-trash-alt largei" onClick={(e) => handledeleteClick(i)}></i>) : ('')}</td>
                <td>
                  <div>

                    {inputList[i].Name || inputList[i].description === !'' ? <Fragment> {inputList.length - 1 === i && <button className='btn btn-primary2' onClick={(e) => handleAddClick(i)}> Add More</button>}</Fragment> : <Fragment><button className='btn btn-primary2' disabled  > Add More</button></Fragment>}

                  </div>
                </td>

              </tr>

            </tbody>
          );
        })}

        <button className='btn btn-primary-submit' onClick={(e) => onSubmit(e)}>Submit</button>

      </table>
    </div>

  );
};

ADDVariation.prototype = {
  setAlert: PropTypes.func.isRequired,
  addvariation: PropTypes.func.isRequired,
  gettype: PropTypes.func.isRequired,
  variations: PropTypes.object.isRequired,
};
const mapStateToprops = (state) => ({
  variations: state.variations,
});
export default connect(mapStateToprops, { setAlert, addvariation, gettype })(ADDVariation);

