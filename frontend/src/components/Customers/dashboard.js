import React, { useState, useEffect } from "react";
import FoodTable from "./foodTable";
import FilterForm from "./filterForm";
import CustomToast from "./customToast";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getFoodData } from "actions/foodActions";

const CustomerDashboard = (props) => {
  const { dispatch } = props;
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    dispatch(getFoodData());
  }, [dispatch]);

  return (
    <div>
      {showToast ? (
        <CustomToast
          bodyText="Successfully added to your order"
          isSuccess={true}
          setShowToast={setShowToast}
        />
      ) : null}
      <FilterForm />
      <FoodTable setShowToast={setShowToast} />
    </div>
  );
};

const mapStateToProps = (state) => ({});

export default withRouter(connect(mapStateToProps)(CustomerDashboard));
