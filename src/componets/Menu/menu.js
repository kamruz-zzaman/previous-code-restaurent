import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getmenu } from '../../actions/menu';
import Allmenu from './Allmenu2';
import ADDmenu from './addmenu';
import Editmenu from './Editmenu';
import { Link } from 'react-router-dom';
const Menu = ({
  match
}) => {
  const [showaddmenu, setshowaddmenu] = useState(false);
  const [editall, seteditall] = useState(false);

  const [showallmenu, setshowallmenu] = useState(true);
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
          <button className='large btn btn-primary' onClick={(e) => onshowmenu(e)}><i className="fas fa-plus"></i> Add Menu</button>
          <button className='large btn btn-primary' onClick={(e) => onAllmenu(e)}> All Menu</button>
          <button className='large btn btn-primary' onClick={(e) => oneditall(e)}><i className="fas fa-edit"></i> Edit All</button>
          <Link className='large btn btn-primary' to={`/dashboard/${match.params.id}`}>Back to  dashboard</Link>

        </div>
      </div>
      {showaddmenu ? (<ADDmenu id={match.params.id} />) : ('')}
      {editall ? (<Editmenu id={match.params.id} />) : ('')}
      {showallmenu ? (<Allmenu id={match.params.id} />) : ('')}




    </Fragment>
  );
};

Menu.propTypes = {

};
const mapStateToProps = (state) => ({

});
export default connect(mapStateToProps, { getmenu })(Menu);
