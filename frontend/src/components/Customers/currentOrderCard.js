import React, { useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { connect } from "react-redux";
import FA from "react-fontawesome";
import { resetCurrentOrder, addAvailablePromoToCurrentOrder } from "actions/orderActions";
import ConfirmOrderModal from "./confirmOrderModal";
import { db } from "config/db";

const CurrentOrderCard = (props) => {
  const {
    currentOrder,
    setShowSuccessToast,
    setSuccessMsg,
    isBeingDelivered,
    dispatch,
    setShowToast,
    setError,
    uid,
  } = props;
  const [showConfirmOrderModal, setShowConfirmOrderModal] = useState(false);
  const totalCost = currentOrder
    .reduce((total, foodItem) => total + foodItem.qty * foodItem.price, 0)
    .toFixed(2);

  const checkValidOrder = async () => {
    let res = await fetch(`${db}/check_valid_order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid: uid, currentOrder: currentOrder }),
    });
    if (res.status === 200) {
      let body = await res.json();
      dispatch(addAvailablePromoToCurrentOrder(body));
      return "";
    } else {
      let data = await res.json();
      return data.error;
    }
  };
  const handlePlaceOrder = async (e) => {
    let res = await checkValidOrder();
    if (res !== "") {
      setError(res);
      setShowToast(true);
      return;
    }
    setShowConfirmOrderModal(true);
  };

  return (
    <div>
      {isBeingDelivered ? (
        <Card style={{ width: "36rem", border: "1.5px solid rgba(0, 0, 0, 0.125)" }}>
          <Card.Body style={{ textAlign: "center", fontSize: "18px", padding: "2rem 4rem" }}>
            <div>Order being delivered...</div>
            <div style={{ marginTop: "1rem" }}>
              <FA name="truck" size="4x" />
            </div>
          </Card.Body>
        </Card>
      ) : (
        <>
          {showConfirmOrderModal ? (
            <ConfirmOrderModal
              setSuccessMsg={setSuccessMsg}
              setShowSuccessToast={setShowSuccessToast}
              setError={setError}
              setShowToast={setShowToast}
              currentOrder={currentOrder}
              totalCost={totalCost}
              setShowConfirmOrderModal={setShowConfirmOrderModal}
            />
          ) : null}
          <Card style={{ width: "36rem" }}>
            <div
              style={{ position: "absolute", top: "5px", right: "10px", cursor: "pointer" }}
              onClick={() => {
                dispatch(resetCurrentOrder());
              }}
            >
              <FA name="close" />
            </div>
            <Card.Body style={{ textAlign: "center", fontSize: "18px", padding: "2rem 4rem" }}>
              <Card.Title>Order</Card.Title>
              <div style={{ padding: "1rem 0" }}>
                {currentOrder.length === 0 ? "No Items" : null}
                {currentOrder.map((foodItem) => (
                  <Row key={foodItem.foodname}>
                    <Col>{foodItem.qty}x</Col>
                    <Col>{foodItem.foodname}</Col>
                    <Col>SGD {(foodItem.price * foodItem.qty).toFixed(2)}</Col>
                  </Row>
                ))}
              </div>
              {currentOrder.length === 0 ? null : (
                <>
                  <div style={{ padding: "1rem 0" }} className="text-muted">
                    <Row style={{ padding: "0 2rem" }}>
                      <Col>Subtotal</Col>
                      <Col>SGD {totalCost}</Col>
                    </Row>
                    <Row style={{ padding: "0 2rem" }}>
                      <Col>Delivery Fee</Col>
                      <Col>SGD {(0.2 * totalCost).toFixed(2)}</Col>
                    </Row>
                    <Row style={{ padding: "0 2rem" }}>
                      <Col>Total</Col>
                      <Col>SGD {(1.2 * totalCost).toFixed(2)}</Col>
                    </Row>
                  </div>
                  <div>
                    <Button
                      variant="success"
                      block
                      disabled={currentOrder.length === 0}
                      onClick={handlePlaceOrder}
                    >
                      Place Order
                    </Button>
                  </div>
                </>
              )}
            </Card.Body>
          </Card>
        </>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    isBeingDelivered: state.order.isBeingDelivered,
    uid: state.auth.uid,
  };
};

export default connect(mapStateToProps)(CurrentOrderCard);
