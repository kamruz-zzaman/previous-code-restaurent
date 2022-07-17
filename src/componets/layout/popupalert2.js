import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Alert from 'react-popup-alert'
//alert layout
const PopupAlert2 = ({ popupalerts }) =>popupalerts !== null &&
popupalerts.length > 0 && popupalerts.map((alert) => (<Fragment>
    {console.log(alert)}
<div key={alert.id} className={`alert alert-${alert.alertType}`}>
{alert.msg}
    </div>

    
    <Alert
        header={'Header'}
        btnText={'Close'}
        text={alert.msg}
        type={alert.alertType}
        show={alert.show}
        pressCloseOnOutsideClick={true}
        showBorderBottom={true}
       
      />
    </Fragment>
));
;
PopupAlert2.propTypes = {
    popupalerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
    popupalerts: state.popupalerts,
});

export default connect(mapStateToProps)(PopupAlert2);