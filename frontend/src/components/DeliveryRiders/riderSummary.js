import { db } from "config/db";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import SmallCard from "../Stats/smallCard";
import "../Stats/summary.css";
import "../Stats/utilities.css";
import RiderProgress from "./riderProgress";

const RiderSummary = (props) => {
  const { uid } = props;
  const [numOfOrders, setNumOfOrders] = useState(0);
  const [numOfHours, setNumOfHours] = useState(0);
  const [salary, setSalary] = useState(0);
  const [avgDeliveryTime, setAvgDeliveryTime] = useState(0);
  const [numOfRatings, setNumOfRatings] = useState(0);
  const [avgRating, setAvgRating] = useState(0);
  const [salaryWeight, setSalaryWeight] = useState(0);
  const [orderWeight, setOrderWeight] = useState(0);
  const [timeWeight, setTimeWeight] = useState(0);

  useEffect(() => {
    const getRiderMonthlyStats = async () => {
      try {
        let res = await fetch(`${db}/get_rider_monthly_stats`);
        let data = await res.json();
        let riderData = data[uid - 4];

        setNumOfOrders(riderData.numoforders);
        setNumOfHours(riderData.numofhours);
        setSalary(riderData.salary);
        setAvgDeliveryTime(riderData.avgdeliverytime);
        setNumOfRatings(riderData.numOfRatings);
        setAvgRating(riderData.avgRating);
        console.log(riderData.avgRating);
      } catch (error) {
        console.log(error);
      }
    };
    getRiderMonthlyStats();
  }, [numOfOrders, numOfHours, salary, avgDeliveryTime, numOfRatings, avgRating, uid]);

  return (
    <div>
      <br />
      <h1 className="Summary-name u-textCenter">Rider Summary Statistics</h1>
      <hr className="Summary-line" />
      <div className="u-flex">
        <div className="Summary-subContainer u-textCenter">
          <SmallCard subtitle={"Orders delivered this month"} content={numOfOrders + orderWeight} />
        </div>
        <div className="Summary-subContainer u-textCenter">
          <SmallCard subtitle={"Total Salary earned"} content={"$" + (salary + salaryWeight)} />
        </div>
        <div className="Summary-subContainer u-textCenter">
          <SmallCard subtitle={"Number of Hours Worked"} content={numOfHours + " hours"} />
        </div>
      </div>
      <div className="u-flex">
        <div className="Summary-subContainer u-textCenter">
          <SmallCard
            subtitle={"Average Rating"}
            content={avgRating ? avgRating : "No ratings yet"}
          />
        </div>
        <div className="Summary-subContainer u-textCenter">
          <SmallCard subtitle={"Number of Ratings"} content={numOfRatings ? numOfRatings : 0} />
        </div>
        <div className="Summary-subContainer u-textCenter">
          <SmallCard
            subtitle={"Average Delivery Time"}
            content={
              avgDeliveryTime + timeWeight === 0
                ? "No deliveries yet"
                : avgDeliveryTime + timeWeight + " min"
            }
          />
        </div>
      </div>
      <RiderProgress
        salarySetter={setSalaryWeight}
        orderSetter={setOrderWeight}
        timeSetter={setTimeWeight}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    uid: state.auth.uid,
  };
};

export default connect(mapStateToProps)(RiderSummary);
