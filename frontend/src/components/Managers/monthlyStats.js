import { db } from "config/db";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import SmallCard from "../Stats/smallCard";
import "../Stats/summary.css";
import { Button } from "react-bootstrap";
import "../Stats/utilities.css";

const MonthlyStats = (props) => {
  const [month, setMonth] = useState(new Date().getMonth());
  const [monthlyOrder, setMonthlyOrder] = useState(0);
  const [monthlyCost, setMonthlyCost] = useState(0);
  const [monthlyCustomers, setMonthlyCustomers] = useState(0);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    const getMonthlyStats = async () => {
      let res = await fetch(`${db}/get_monthly_stats`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ month: month + 1 }),
      });
      if (res.status === 200) {
        let data = await res.json();
        console.log(data);
        setMonthlyOrder(data.gettotalmonthlyorder[0].count);
        setMonthlyCost(data.gettotalmonthlycost[0].sum);
        console.log(monthlyCost);
        setMonthlyCustomers(data.gettotalmonthlynewcustomer[0].count);
      } else {
        let data = await res.json();
        console.log(data.error);
      }
    };
    getMonthlyStats();
  }, [monthlyOrder, monthlyCost, monthlyCustomers, month]);

  const incrementMonth = () => {
    const newMonth = month + 1;
    if (newMonth <= 11) {
      setMonth(newMonth);
    }
  };

  const decrementMonth = () => {
    const newMonth = month - 1;
    if (newMonth >= 0) {
      setMonth(newMonth);
    }
  };

  return (
    <div className="Summary-container">
      <hr className="Summary-line" />
      <div className="u-flex u-flex-spaceBetween">
        <Button variant="info" onClick={decrementMonth}>
          Prev
        </Button>
        <Button variant="info" onClick={incrementMonth}>
          Next
        </Button>
      </div>

      <h2 className="Summary-subName u-textCenter">Summary Statistics for {months[month]}</h2>

      <div className="u-flex">
        <div className="Summary-subContainer u-textCenter">
          <SmallCard subtitle={"Number of Orders"} content={monthlyOrder} />
        </div>
        <div className="Summary-subContainer u-textCenter">
          <SmallCard subtitle={"Cost of Orders"} content={"$" + (monthlyCost ? monthlyCost : 0)} />
        </div>
        <div className="Summary-subContainer u-textCenter">
          <SmallCard subtitle={"Number of New Customers"} content={monthlyCustomers} />
        </div>
      </div>
      <hr className="Summary-line" />
    </div>
  );
};

export default connect()(MonthlyStats);
