import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Editvariationtype } from '../actions/variations'
import { connect } from 'react-redux';

//show all menu UI
const AllvarationtypeAUI = ({
  auth,
  variation: { varation_type_id, Name, description },
  id,
  Editvariationtype,
  index
}) => {
  const [formData, setFormData] = useState({

    V_Name: Name,
    V_description: description,
    Vid: varation_type_id
  });
  const [editflag, setseditflag] = useState(false);
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const { V_Name, V_description, Vid } = formData;


  const onSubmit2 = async (e) => {
    e.preventDefault();
    setseditflag(false)
    Editvariationtype(formData)



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
          <Link to={`/AddVariation/${varation_type_id}/${Name}/${id}`} className='btn btn-light'>Variations</Link></td>



        <td>
          <button className='btn btn-primary2' onClick={(e) => onSubmit2(e)}>Update</button>
        </td>

      </tr>

    </tbody>) : (

      <tbody>
        <tr>
          <td>{index}</td>
          <td>{Name} </td>
          <td>{description}</td>
          <td>

            <Link to={`/AddVariation/${varation_type_id}/${Name}/${id}`} className='btn btn-light'> Variations</Link>
          </td>



          <td><i className="fas fa-pen" onClick={(e) => setseditflag(!editflag)}></i></td>
        </tr>

      </tbody>)}</Fragment>
  )
};


AllvarationtypeAUI.propTypes = {
  menus: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  Editvariationtype: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { Editvariationtype })(AllvarationtypeAUI);