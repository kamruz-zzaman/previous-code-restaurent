import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { addmenu } from '../../actions/menu'
import PropTypes from 'prop-types';


//Add menu Form
const AddMenu = ({ addmenu, setAlert, id }) => {
  const [inputList, setInputList] = useState([{ Menu_Name: "", Menu_Description: "" }]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };



  // handle click event of the Add button
  const handleAddClick = (y) => {
    let msg = '';
    let x = 0;
    let i = 0
    for (i = 0; i < inputList.length; i++) {
      if (inputList[i].Menu_Description === '') {
        x++;
        msg = msg + `Please add a Description for your menu at row no: ${i + 1}. `
        // setAlert(`Please add a Description for your menu at row no: ${i+1}`, 'danger');

      }
      if (inputList[i].Menu_Name === '') {
        x++;
        msg = msg + `Please add the menu name at row no: ${i + 1}. `
        // setAlert(`Please add the menu name at row no: ${i+1}`, 'danger');

      }

    }


    if (x > 0) { setAlert(`${msg}`, 'danger'); }



    else {


      setInputList([...inputList, { Menu_Name: "", Menu_Description: "" }]);
    }

  }

  const handledeleteClick = (i) => {

    const list2 = [...inputList];
    list2.splice(i, 1);
    setInputList(list2);
  };


  //validation of Result and submit to API
  const onSubmit = async (e) => {
    e.preventDefault();
    let x = 0;
    let i;
    let msg = '';
    //validation if all the feilds are filled when submit button is clicked
    for (i = 0; i < inputList.length; i++) {
      if (inputList[i].Menu_Description === '') {
        x++;
        msg = msg + `Please add a Description for your menu at row no: ${i + 1}. `
        // setAlert(`Please add a Description for your menu at row no: ${i+1}`, 'danger');

      }
      if (inputList[i].Menu_Name === '') {
        x++;
        msg = msg + `Please add the menu name at row no: ${i + 1}. `
        // setAlert(`Please add the menu name at row no: ${i+1}`, 'danger');

      }

    }
    if (x > 0) {
      setAlert(`${msg}`, 'danger');
    }
    else {
      let menu = inputList

      // addmenu(menu, id)
      // setInputList([{ Menu_Name: "", Menu_Description: "" }])
      console.log(menu);
    };
  };

  return (

    <div className='table-wrapper'>

      <h1 className='large text-center text-primary'>ADD Menu</h1>
      <table className="fl-table">

        <thead>
          <tr>
            <th width="10%">#</th>
            <th>Menu Name</th>
            <th>Menu Description</th>
            <th></th>
            <th></th>
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


                  <input className="form-control" type='text'
                    name="Menu_Name"
                    placeholder="Enter Menu Name"
                    value={x.Menu_Name}
                    onChange={e => handleInputChange(e, i)}
                    required />


                </td>
                <td>

                  <textarea
                    className="form-control"
                    name="Menu_Description"
                    placeholder="Enter Menu Description"
                    value={x.Menu_Description}
                    onChange={e => handleInputChange(e, i)}
                    rows={1}
                    required
                  />

                </td>
                <td>{i > 0 ? (<i className="fas fa-trash-alt largei" onClick={(e) => handledeleteClick(i)}></i>) : ('')}</td>
                <td>

                  {inputList[i].Menu_Name || inputList[i].Menu_Description === !'' ? <Fragment> {inputList.length - 1 === i && <button className='btn btn-primary2' onClick={(e) => handleAddClick(i)}> <i className="fas fa-plus"></i> Add More</button>}</Fragment> : <Fragment><button className='btn btn-primary2' disabled  ><i className="fas fa-plus"></i> Add More</button></Fragment>}


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

AddMenu.prototype = {
  setAlert: PropTypes.func.isRequired,
  addmenu: PropTypes.func.isRequired,
};
const mapStateToprops = (state) => ({

});
export default connect(mapStateToprops, { setAlert, addmenu })(AddMenu);
