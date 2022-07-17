import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//alert layout
const Alerts = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    
    
     <div key={alert.id} className={`alert ${alert.alertType}`}>
		<input type="checkbox" id="alert5"/>
		<label className="close" title="close" for="alert5">
      <i className="icon-remove"></i>
    </label>
		<p className="inner">
    {alert.msg}
		</p>
	</div>
     
     
     
      
  ));
Alerts.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alerts);
