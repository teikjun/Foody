import { db } from "config/db";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "../Stats/summary.css";
import "../Stats/utilities.css";
import { Button } from "react-bootstrap";

const AvailabilityList = (props) => {
  const [availability, setAvailability] = useState(0);
  const [foodName, setFoodName] = useState("");
  const { uid } = props;
  const [weight, setWeight] = useState(0);

  const addAvailability = async () => {
    let res = await fetch(`${db}/add_availability`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ foodName: foodName }),
    });
    if (res.status === 200) {
      console.log("added");
    } else {
      let data = await res.json();
      console.log(data.error);
    }
    setWeight(weight + 1);
  };

  const minusAvailability = async () => {
    let res = await fetch(`${db}/minus_availability`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ foodName: foodName }),
    });
    if (res.status === 200) {
      console.log("minus");
    } else {
      let data = await res.json();
      console.log(data.error);
    }
    if (availability + weight >= 1) {
      setWeight(weight - 1);
    }
  };

  useEffect(() => {
    const getFoodData = async () => {
      try {
        let res = await fetch(`${db}/get_food_data`);
        let data = await res.json();
        console.log(data);
        let staffData = data[uid - 8];
        setAvailability(staffData.availability);
        setFoodName(staffData.foodname);
      } catch (error) {
        console.log(error);
      }
    };
    getFoodData();
  });

  return (
    <div className="Summary-container">
      <hr className="Summary-line" />
      <h2 className="Summary-subName u-textCenter">Food Item Availability</h2>
      <div className="u-flex u-flex-justifyCenter u-flex-spaceBetween food-container u-smallMarginTop">
        <Button variant="info" onClick={minusAvailability}>
          Less
        </Button>
        <span className="spacedLeft">{foodName}</span>
        <span className="spacedRight">{availability + weight}</span>
        <Button variant="info" onClick={addAvailability}>
          More
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    uid: state.auth.uid,
  };
};

export default connect(mapStateToProps)(AvailabilityList);
