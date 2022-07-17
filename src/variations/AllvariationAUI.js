import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Editsinglevariation } from '../actions/variations'
import { connect } from 'react-redux';

//show all menu UI
const AllvarationAUI = ({
  auth,
  linkvariations: { Varation_id, typeID, Name, description, Price },
  id,
  Editsinglevariation,
  index

}) => {
  const [formData, setFormData] = useState({

    V_Name: Name,
    V_description: description,
    Vid: Varation_id,
    V_price: Price
  });
  const [editflag, setseditflag] = useState(false);
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const { V_Name, V_description, Vid } = formData;


  const onSubmit2 = async (e) => {
    e.preventDefault();
    setseditflag(false)
    Editsinglevariation(formData)



  };
  return (
    <Fragment>{editflag ? (<tbody>
      <tr>
        <td>{index}</td>
        <td>
          <form className='form' >
            <div className='form-groupnopadding'>
              <input
                type='text'
                placeholder='Enter  Name'
                name='V_Name'
                value={V_Name}
                onChange={(e) => onChange(e)}
              //required
              />
            </div>
          </form>
        </td>
        <td><form className='form' >
          <div className='form-groupnopadding'>
            <input
              type='text'
              placeholder='Enter Name'
              name='V_description'
              value={V_description}
              onChange={(e) => onChange(e)}
            //required
            />
          </div>
        </form></td>




        <td>
          <button className='btn btn-primary2' onClick={(e) => onSubmit2(e)}>Update</button>
        </td>

      </tr>

    </tbody>) : (<tbody>
      <tr>
        <td>{index}</td>
        <td height="60px">{Name} </td>
        <td height="60px">{description}</td>




        <td><i className="fas fa-pen" onClick={(e) => setseditflag(!editflag)}></i></td>
      </tr>

    </tbody>)}</Fragment>
  )
};


AllvarationAUI.propTypes = {
  menus: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  Editsinglevariation: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { Editsinglevariation })(AllvarationAUI);