import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { gettype } from '../actions/variations'
import ADDvaritype from './addvariationtype';
import Allvari from './AllvaraiationtypeA';
import { Link } from 'react-router-dom';
const AllvariationType = ({
    variations: { variations, loading }, match
}) => {

    const [showaddmenu, setshowaddmenu] = useState(false);
    const [editall, seteditall] = useState(false);
    //show all menu
    return (
        <Fragment>
            <div>

                <div className='btn-center'>
                    <button className='large btn btn-primary' onClick={(e) => setshowaddmenu(!showaddmenu)}><i className="fas fa-plus"></i> Add Varation Type</button>
                    <Link className='large btn btn-primary' to={`/dashboard/${match.params.id}`}>Back to  dashboard</Link>

                </div>
            </div>
            {showaddmenu ? (<ADDvaritype id={match.params.id} />) : ('')}

            <Allvari id={match.params.id} />



        </Fragment>
    );
};

AllvariationType.propTypes = {
    gettype: PropTypes.func.isRequired,
    variations: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    variations: state.variations,
});
export default connect(mapStateToProps, { gettype })(AllvariationType);
