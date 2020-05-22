import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ManagerSummary from "./managerSummary";
import "../Stats/container.css";
import MonthlyStats from "./monthlyStats";

const ManagerDashboard = (props) => {
  return (
    <div className="container">
      <ManagerSummary />
      <MonthlyStats />
    </div>
  );
};

const mapStateToProps = (state) => ({});

export default withRouter(connect(mapStateToProps)(ManagerDashboard));
