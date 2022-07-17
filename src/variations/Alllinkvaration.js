import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { gettype } from '../actions/variations'
import ADDvaritype from './addvariationform';
import Allvari from './AllveriationA';
import { Link } from 'react-router-dom';
const Alllinkvariation = ({
  variations: { variations, loading }, match
}) => {

  const [showaddmenu, setshowaddmenu] = useState(false);
  const [editall, seteditall] = useState(false);
  //show all menu
  return (
    <Fragment>
      <div>

        <div className='btn-center'>
          <button className='large btn btn-primary' onClick={(e) => setshowaddmenu(!showaddmenu)}><i className="fas fa-plus"></i> Add Variation</button>
          <Link className='large btn btn-primary' to={`/AddVariationtype/${match.params.rid}`}>Back to  Variations Type</Link>
          <Link className='large btn btn-primary' to={`/dashboard/${match.params.id}`}>Back to  dashboard</Link>

        </div>
      </div>
      {showaddmenu ? (<ADDvaritype id={match.params.id} />) : ('')}

      <Allvari id={match.params.id} name={match.params.name} />



    </Fragment>
  );
};

Alllinkvariation.propTypes = {
  gettype: PropTypes.func.isRequired,
  variations: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  variations: state.variations,
});
export default connect(mapStateToProps, { gettype })(Alllinkvariation);
