import { db } from "config/db";
import React, { useState } from "react";
import { connect } from "react-redux";
import "../Stats/summary.css";
import "../Stats/utilities.css";
import { Button } from "react-bootstrap";

const RiderProgress = (props) => {
  const { uid, salarySetter, orderSetter, timeSetter } = props;
  const [progress, setProgress] = useState(1);
  const progressStatement = [
    "Order has not been placed",
    "Departing to collect food",
    "Arrived at restaurant",
    "Departed from restaurant",
    "Order Delivered",
  ];
  const queryStages = [
    `${db}/set_t_depart_to_rest`,
    `${db}/set_t_arrive_at_rest`,
    `${db}/set_t_depart_from_rest`,
    `${db}/set_deliver_order`,
  ];

  const queryByStage = async () => {
    let res = await fetch(queryStages[progress - 1], {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid: uid }),
    });
    if (res.status === 200) {
      let data = await res;
      console.log("delivered by stage");
      console.log(data);
    } else {
      let data = await res.json();
      console.log(data.error);
    }
  };

  const nextProgress = () => {
    if (progress !== 0) {
      queryByStage();
    }
    if (progress === 4) {
      setProgress(0);
      salarySetter(5);
      orderSetter(1);
      timeSetter(2);
    } else if (progress !== 10) {
      setProgress(progress + 1);
    } else {
    }
  };

  return (
    <div>
      <br />
      {progress !== 0 ? (
        <Button variant="info" onClick={nextProgress} size="lg" block>
          {progressStatement[progress]}
        </Button>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    uid: state.auth.uid,
  };
};

export default connect(mapStateToProps)(RiderProgress);
