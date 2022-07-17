import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getmenu } from '../../actions/menu';
import Alldish from './AlldishesA';
import ADDdish from './adddish';
import { Link } from 'react-router-dom';
import Editdish from './Editdishes';

const DishA = ({
  match
}) => {
  const [showaddmenu, setshowaddmenu] = useState(false);
  const [showallmenu, setshowallmenu] = useState(true);
  const [editall, seteditall] = useState(false);
  const onshowmenu = (e) => {
    setshowaddmenu(!showaddmenu)

    seteditall(false)

  };
  const oneditall = (e) => {
    setshowaddmenu(false)

    seteditall(!editall)

  };

  const onAllmenu = (e) => {
    setshowaddmenu(false)

    seteditall(false)
  }
  //show all menu
  return (
    <Fragment>
      <div>

        <div className='btn-center'>
          <button className='large btn btn-primary' onClick={(e) => onshowmenu(e)}><i className="fas fa-plus"></i> Add Dish</button>
          <button className='large btn btn-primary' onClick={(e) => onAllmenu(e)}> All dishes</button>
          <button className='large btn btn-primary' onClick={(e) => oneditall(e)}>{!editall ? (<Fragment><i className="fas fa-edit"></i> Edit All</Fragment>) : ('Back to dishes')}</button>
          <Link className='large btn btn-primary' to={`/dashboard/${match.params.rid}`}>Back to  dashboard</Link>
          <Link className='large btn btn-primary' to={`/addmenu/${match.params.rid}`}>Back to Menu</Link>
        </div>
      </div>



      {showaddmenu ? (<ADDdish id={match.params.id} rid={match.params.rid} name={match.params.name} />) : ('')}
      {editall ? (<Editdish id={match.params.id} rid={match.params.rid} />) : ('')}
      {showallmenu ? (<Alldish id={match.params.id} rid={match.params.rid} name={match.params.name} />) : ('')}



    </Fragment>
  );
};

DishA.propTypes = {

};
const mapStateToProps = (state) => ({

});
export default connect(mapStateToProps, { getmenu })(DishA);
