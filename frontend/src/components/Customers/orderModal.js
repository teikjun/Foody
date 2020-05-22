import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import FA from "react-fontawesome";
import "assets/orderModal.css";
import { connect } from "react-redux";
import { addFoodToCurrentOrder } from "actions/orderActions";

const OrderModal = (props) => {
  const { setShowOrderModal, setShowToast, rowData, dispatch } = props;
  const [qty, setQty] = useState(1);

  const handleSubmit = () => {
    setShowOrderModal(false);
    setShowToast(true);
    dispatch(addFoodToCurrentOrder({ ...rowData, qty }));
  };

  const handleClose = () => {
    setShowOrderModal(false);
  };

  return (
    <div>
      <Modal dialogClassName="custom-dialog" show={true} onHide={handleClose} animation={false}>
        <Modal.Header style={{ alignSelf: "center" }}>
          <Modal.Title>Ordering...</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: "2rem" }}>
          <div style={{ display: "flex" }}>
            <h3 style={{ flex: "auto" }}>{rowData.foodname}</h3>
            <span style={{ alignSelf: "center", color: "grey" }}>
              SGD {(rowData.price * qty).toFixed(2)}
            </span>
          </div>
          <span style={{ color: "grey" }}>from {rowData.rname}</span>
        </Modal.Body>
        <Modal.Footer style={{ padding: "0.75rem 1.5rem" }}>
          <div style={{ margin: "0px 0.75rem 0px 0.25rem" }}>
            <span
              style={
                qty === 1 ? { color: "darkgrey" } : { color: "lightseagreen", cursor: "pointer" }
              }
              onClick={() => (qty > 1 ? setQty(qty - 1) : null)}
            >
              <FA size="2x" name="minus" />
            </span>
            <span
              style={{
                userSelect: "none",
                padding: "0 1rem",
                verticalAlign: "super",
                fontSize: "20px",
                fontWeight: "500",
              }}
            >
              {qty}
            </span>
            <span
              style={
                qty === rowData.currentorders
                  ? { color: "darkgrey" }
                  : { color: "lightseagreen", cursor: "pointer" }
              }
              onClick={() => (qty === rowData.currentorders ? null : setQty(qty + 1))}
            >
              <FA size="2x" name="plus" />
            </span>
          </div>
          <Button variant="info" style={{ height: "3rem", flex: "auto" }} onClick={handleSubmit}>
            ADD TO CART
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default connect()(OrderModal);
