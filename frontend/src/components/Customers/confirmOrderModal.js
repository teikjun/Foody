import { db } from "config/db";
import React, { useState, useEffect } from "react";
import { Button, Modal, Row, Col, Form, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { orderPlaced, resetCurrentOrder } from "actions/orderActions";

const promoMap = {
  1: {
    promoName: "First Order Promotion",
    foodCostPercentage: 0.9,
    deliveryCostPercentage: 1.0,
    totalCostPercentage: 0.5,
  },
  2: {
    promoName: "Delivery Promotion",
    foodCostPercentage: 1.0,
    deliveryCostPercentage: 0,
    totalCostPercentage: 1.0,
  },
  3: {
    promoName: "Restaurant Promotion",
    foodCostPercentage: 0.9,
    deliveryCostPercentage: 1.0,
    totalCostPercentage: 1.0,
  },
  4: {
    promoName: "Restaurant Promotion",
    foodCostPercentage: 0.8,
    deliveryCostPercentage: 1.0,
    totalCostPercentage: 1.0,
  },
};

const ConfirmOrderModal = (props) => {
  const {
    setShowConfirmOrderModal,
    setShowSuccessToast,
    setSuccessMsg,
    setError,
    setShowToast,
    rewardPoints,
    totalCost,
    uid,
    currentOrder,
    dispatch,
    availablePromoIds,
  } = props;
  const [prevDeliveryLocations, setPrevDeliveryLocations] = useState([]);
  const [inputDeliveryLocation, setInputDeliveryLocation] = useState("");
  const [chosenPrevDeliveryLocation, setChosenPrevDeliveryLocation] = useState("");
  const [useRewardPoints, setUseRewardPoints] = useState(false);
  const [reqError, setReqError] = useState(false);

  useEffect(() => {
    const getRecentOrderLocations = async () => {
      let res = await fetch(`${db}/get_recent_order_locations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uid: uid }),
      });
      if (res.status === 200) {
        let data = await res.json();
        setPrevDeliveryLocations(data);
        if (data.length > 0) setChosenPrevDeliveryLocation(data[0]);
      } else {
        let data = await res.json();
        console.log(data.error);
      }
    };
    getRecentOrderLocations();
  }, [uid]);

  const placeOrder = async () => {
    let res = await fetch(`${db}/place_order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid: uid,
        currentOrder: currentOrder,
        useRewardPoints: useRewardPoints,
        deliveryLocation:
          inputDeliveryLocation === "" ? chosenPrevDeliveryLocation : inputDeliveryLocation,
      }),
    });
    if (res.status === 200) {
      dispatch(orderPlaced());
      dispatch(resetCurrentOrder());
      setSuccessMsg("Order placed successfully!");
      setShowSuccessToast(true);
    } else {
      let data = await res.json();
      setError(data.error);
      setShowToast(true);
    }
  };

  const handleSubmit = async () => {
    if (chosenPrevDeliveryLocation === "" && inputDeliveryLocation === "") {
      setReqError(true);
      return;
    }
    await placeOrder();
    setShowConfirmOrderModal(false);
  };

  const handleClose = () => {
    setShowConfirmOrderModal(false);
  };

  const handlePrevLocationChange = (e) => {
    setChosenPrevDeliveryLocation(e.target.value);
  };

  const handleInputDeliveryLocationChange = (e) => {
    setInputDeliveryLocation(e.target.value);
  };

  const handleCheckBoxChange = (e) => {
    setUseRewardPoints(e.target.checked);
  };

  const calcUsableRewardPoints = () => {
    return Math.min(Math.floor((0.2 * totalCost) / 0.1), rewardPoints);
  };

  const handlePromoChange = (e) => {};

  return (
    <div>
      <Modal dialogClassName="custom-dialog" show={true} onHide={handleClose} animation={false}>
        <Modal.Header style={{ alignSelf: "center" }}>
          <Modal.Title>Confirm Order</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: "1rem 2rem" }}>
          <div>
            <Row
              style={{ fontFamily: "cursive", textAlign: "center", padding: "1rem 2rem 2rem 2rem" }}
            >
              <Col>Total Cost</Col>
              <Col>
                {useRewardPoints
                  ? `SGD ${(
                      +totalCost + +(0.2 * totalCost - calcUsableRewardPoints() * 0.1)
                    ).toFixed(2)}`
                  : `SGD ${(1.2 * totalCost).toFixed(2)}`}
              </Col>
            </Row>
            <Row>
              <Form.Group style={{ width: "100%" }} controlId="useAvailableRewardPoints">
                <Form.Check style={{ padding: 0 }} type="checkbox" id="useRewardPoints">
                  <Form.Check.Label>Use Available Reward Points</Form.Check.Label>
                  <Form.Check.Input
                    onChange={handleCheckBoxChange}
                    style={{
                      position: "relative",
                      marginTop: 0,
                      verticalAlign: "middle",
                      marginLeft: "1rem",
                    }}
                    type="checkbox"
                    isValid
                  />
                </Form.Check>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group controlId="paymentOption">
                <Form.Label>Payment Option</Form.Label>
                <Form.Control as="select">
                  <option>Credit Card</option>
                  <option>Cash on Delivery</option>
                </Form.Control>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group controlId="promoId">
                <Form.Label>Available Promos</Form.Label>
                <Form.Control as="select" onChange={handlePromoChange}>
                  {availablePromoIds.map((promoId) => (
                    <option key={promoId} value={promoId}>
                      {promoMap[promoId].promoName}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group controlId="prevDeliveryLocation">
                <Form.Label>Use Previous Delivery Location</Form.Label>
                <Form.Control
                  as="select"
                  disabled={inputDeliveryLocation !== "" || prevDeliveryLocations.length === 0}
                  onChange={handlePrevLocationChange}
                >
                  {prevDeliveryLocations.map((x) => (
                    <option key={x} value={x}>
                      {x}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group style={{ width: "100%" }} controlId="newDeliveryLocation">
                <Form.Label>New Delivery Location</Form.Label>
                <Form.Control
                  style={{ width: "50%" }}
                  value={inputDeliveryLocation}
                  onChange={handleInputDeliveryLocationChange}
                  type="text"
                />
              </Form.Group>
              {reqError ? (
                <Alert style={{ width: "50%" }} variant="danger">
                  Required
                </Alert>
              ) : null}
            </Row>
          </div>
        </Modal.Body>
        <Modal.Footer style={{ padding: "0.75rem 1.5rem" }}>
          <Button variant="info" style={{ height: "3rem", flex: "auto" }} onClick={handleSubmit}>
            Confirm Order
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    rewardPoints: state.auth.rewardPoints,
    uid: state.auth.uid,
    currentOrder: state.order.currentOrder,
    availablePromoIds: state.order.availablePromoIds,
  };
};

export default connect(mapStateToProps)(ConfirmOrderModal);
