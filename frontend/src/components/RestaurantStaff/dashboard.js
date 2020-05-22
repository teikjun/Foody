import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import StaffSummary from "./staffSummary";
import "../Stats/container.css";
import AvailabilityList from "./availabilityList";

const RestaurantStaffDashboard = (props) => {
  return (
    <div className="container">
      <StaffSummary />
      <AvailabilityList />
    </div>
  );
};

export default withRouter(connect()(RestaurantStaffDashboard));
