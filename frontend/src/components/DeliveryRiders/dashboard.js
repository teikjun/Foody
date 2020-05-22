import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import RiderSummary from "./riderSummary";

import "../Stats/container.css";

const DeliveryRiderDashboard = (props) => {
  return (
    <div className="container">
      <RiderSummary />
    </div>
  );
};

const mapStateToProps = (state) => ({});

export default withRouter(connect(mapStateToProps)(DeliveryRiderDashboard));
