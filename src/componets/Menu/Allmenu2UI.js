import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Editmenusingle } from '../../actions/menu'
import { connect } from 'react-redux';

//show all menu UI
const AllmenuUI2 = ({
  auth,
  menus: { Menu_id, Totaldishes, Menu_Name, Menu_Description },
  id,
  index,
  Editmenusingle

}) => {
  const [formData, setFormData] = useState({

    Name: Menu_Name,
    Description: Menu_Description,
    Mid: Menu_id
  });
  const [editflag, setseditflag] = useState(false);
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const { Name, Description, Mid } = formData;


  const onSubmit2 = async (e) => {
    e.preventDefault();
    setseditflag(!editflag)
    Editmenusingle(formData)


    console.log(index + 1)
  };
  return (
    <Fragment>{editflag ? (<tbody>
      <tr>
        <td>{index + 1}</td>
        <td>
          <form className='form' >
            <div className='form-groupnopadding'>
              <input
                type='text'
                placeholder='Enter  Name'
                name='Name'
                value={Name}
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
              name='Description'
              value={Description}
              onChange={(e) => onChange(e)}
            //required
            />
          </div>
        </form></td>
        <td>
          {Menu_Name === 'Deals' ? (<Fragment><Link to={`/add-deal/${id}/${Menu_id}`} className='btn btn-light'>View/Add dishes</Link></Fragment>) : (<Fragment><Link to={`/add-dish/${Menu_Name}/${id}/${Menu_id}`} className='btn btn-light'>View/Add dishes</Link></Fragment>)}</td>

        <td><Link to={`/menu/${id}/${Menu_id}`} className='btn btn-light'>{Totaldishes}</Link></td>

        <td>
          <button className='btn btn-primary2' onClick={(e) => onSubmit2(e)}>Update</button>
        </td>

      </tr>

    </tbody>) : (<tbody>
      <tr>
        <td>{index + 1}</td>
        <td>{Menu_Name} </td>
        <td>{Menu_Description}</td>
        <td>
          {Menu_Name === 'Deals' ? (<Fragment><Link to={`/add-deal/${id}/${Menu_id}`} className='btn btn-light'>View/Add dishes</Link></Fragment>) : (<Fragment><Link to={`/add-dish/${Menu_Name}/${id}/${Menu_id}`} className='btn btn-light'>View/Add dishes</Link></Fragment>)}</td>

        <td><Link to={`/menu/${id}/${Menu_id}`} className='btn btn-light'>{Totaldishes}</Link></td>

        <td><i className="fas fa-pen" onClick={(e) => setseditflag(!editflag)}></i></td>
      </tr>

    </tbody>)}</Fragment>
  )
};


AllmenuUI2.propTypes = {
  menus: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  Editmenusingle: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { Editmenusingle })(AllmenuUI2);