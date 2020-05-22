import { db } from "config/db";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import SmallCard from "../Stats/smallCard";
import "../Stats/summary.css";
import "../Stats/utilities.css";

const ManagerSummary = (props) => {
  const [totalOrder, setTotalOrder] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);

  useEffect(() => {
    const getTotalOrder = async () => {
      try {
        let res = await fetch(`${db}/get_total_order`);
        let data = await res.json();
        console.log(data);
        setTotalOrder(data);
      } catch (error) {
        console.log(error);
      }
    };
    getTotalOrder();
  }, [totalOrder]);

  useEffect(() => {
    const getTotalCost = async () => {
      try {
        let res = await fetch(`${db}/get_total_cost`);
        let data = await res.json();
        console.log(data);
        setTotalCost(data);
      } catch (error) {
        console.log(error);
      }
    };
    getTotalCost();
  }, [totalCost]);

  useEffect(() => {
    const getTotalCustomers = async () => {
      try {
        let res = await fetch(`${db}/get_total_customers`);
        let data = await res.json();
        console.log(data);
        setTotalCustomers(data);
      } catch (error) {
        console.log(error);
      }
    };
    getTotalCustomers();
  }, [totalCustomers]);

  return (
    <div className="Summary-container">
      <h1 className="Summary-name u-textCenter">Manager Summary Statistics</h1>
      <hr className="Summary-line" />
      <div className="u-flex">
        <div className="Summary-subContainer u-textCenter">
          <SmallCard subtitle={"Total Number of Orders"} content={totalOrder} />
        </div>
        <div className="Summary-subContainer u-textCenter">
          <SmallCard subtitle={"Total Cost of all Orders"} content={"$" + totalCost} />
        </div>
        <div className="Summary-subContainer u-textCenter">
          <SmallCard subtitle={"Total Number of Customers"} content={totalCustomers} />
        </div>
      </div>
    </div>
  );
};

export default connect()(ManagerSummary);
