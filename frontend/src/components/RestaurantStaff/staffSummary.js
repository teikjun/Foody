import { db } from "config/db";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import SmallCard from "../Stats/smallCard";
import "../Stats/summary.css";
import "../Stats/utilities.css";

const StaffSummary = (props) => {
  const [monthlyOrder, setMonthlyOrder] = useState(0);
  const [monthlyCost, setMonthlyCost] = useState(0);
  const [monthlyCustomers, setMonthlyCustomers] = useState(0);

  useEffect(() => {
    const getMonthlyStats = async () => {
      try {
        let res = await fetch(`${db}/get_this_month_stats`);
        let data = await res.json();
        console.log(data);
        setMonthlyOrder(data.gettotalmonthlyorder[0].count);
        setMonthlyCost(data.gettotalmonthlycost[0].sum);
        setMonthlyCustomers(data.gettotalmonthlynewcustomer[0].count);
      } catch (error) {
        console.log(error);
      }
    };
    getMonthlyStats();
  }, [monthlyOrder, monthlyCost, monthlyCustomers]);

  return (
    <div>
      <h1 className="Summary-name u-textCenter">{"Restaurant Staff Summary Statistics"}</h1>
      <hr className="Summary-line" />
      <div className="u-flex">
        <div className="Summary-subContainer u-textCenter">
          <SmallCard subtitle={"Orders This Month"} content={monthlyOrder} />
        </div>
        <div className="Summary-subContainer u-textCenter">
          <SmallCard
            subtitle={"Cost of Orders This Month"}
            content={"$" + (monthlyCost ? monthlyCost : 0)}
          />
        </div>
        <div className="Summary-subContainer u-textCenter">
          <SmallCard subtitle={"New Customers This Month"} content={monthlyCustomers} />
        </div>
      </div>
    </div>
  );
};

export default connect()(StaffSummary);
