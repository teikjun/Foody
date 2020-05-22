import { db } from "config/db";
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import CurrentOrderCard from "./currentOrderCard";
import CustomToast from "./customToast";
import { orderPlaced, orderNotPlaced } from "actions/orderActions";
import PastOrderCard from "./pastOrderCard";

const OrdersPage = (props) => {
  const { currentOrder, uid, dispatch } = props;
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [pastOrders, setPastOrders] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const { isBeingDelivered } = currentOrder;
  useEffect(() => {
    const hasOngoingOrder = async () => {
      let res = await fetch(`${db}/has_ongoing_order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uid: uid }),
      });
      if (res.status === 200) {
        let data = await res.json();
        if (data) dispatch(orderPlaced());
        else dispatch(orderNotPlaced());
      } else {
        let data = await res.json();
        console.log(data.error);
      }
    };
    const getPastOrders = async () => {
      let res = await fetch(`${db}/get_past_orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uid: uid }),
      });
      if (res.status === 200) {
        let data = await res.json();
        if (data !== null && data.length > 0) {
          setPastOrders(data);
        }
      } else {
        let data = await res.json();
        console.log(data.error);
      }
    };
    hasOngoingOrder();
    getPastOrders();
    setRefresh(false);
    // eslint-disable-next-line
  }, [uid, isBeingDelivered, refresh]);

  return (
    <div>
      {showToast ? (
        <CustomToast bodyText={error} isSuccess={false} setShowToast={setShowToast} />
      ) : null}
      {showSuccessToast ? (
        <CustomToast bodyText={successMsg} isSuccess={true} setShowToast={setShowSuccessToast} />
      ) : null}
      <Container>
        <Col>
          <Row style={{ padding: "1rem 0" }}>
            <Col>
              <Row style={{ justifyContent: "center" }}>
                <h1>Current Order</h1>
              </Row>
              <Row style={{ justifyContent: "center" }}>
                <CurrentOrderCard
                  isCurrentOrder
                  setSuccessMsg={setSuccessMsg}
                  setShowSuccessToast={setShowSuccessToast}
                  setError={setError}
                  currentOrder={currentOrder}
                  setShowToast={setShowToast}
                />
              </Row>
            </Col>
          </Row>
          <Row style={{ justifyContent: "center", padding: "1rem 0" }}>
            <h1>Past Orders</h1>
          </Row>
          <Row style={{ justifyContent: "space-evenly" }}>
            {pastOrders.map((order, idx) => (
              <Col style={idx >= 3 ? { marginTop: "1rem", flex: "0 0 33%" } : { flex: "0 0 33%" }}>
                <PastOrderCard
                  setError={setError}
                  setSuccessMsg={setSuccessMsg}
                  setShowToast={setShowToast}
                  setShowSuccessToast={setShowSuccessToast}
                  setRefresh={setRefresh}
                  order={order}
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentOrder: state.order.currentOrder,
  uid: state.auth.uid,
});

export default connect(mapStateToProps)(OrdersPage);
