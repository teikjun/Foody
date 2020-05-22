import React from "react";
import { Toast } from "react-bootstrap";
import FA from "react-fontawesome";

const CustomToast = (props) => {
  const { setShowToast, isSuccess, bodyText } = props;

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      style={{
        zIndex: 1,
        position: "absolute",
        top: "65px",
        right: "20px",
        opacity: "0.9",
      }}
    >
      <Toast
        onClose={() => setShowToast(false)}
        show={true}
        delay={3000}
        autohide
        style={{
          backgroundColor: isSuccess ? "#00c851" : "red",
          color: "white",
          padding: "0.2rem",
        }}
      >
        <Toast.Body style={{ padding: "0.5rem" }}>
          <span style={{ paddingRight: "5px" }}>
            {isSuccess ? <FA size="2x" name="check" /> : <FA size="2x" name="times-circle" />}
          </span>
          &nbsp;
          <span style={{ fontSize: "1rem", verticalAlign: "super" }}>{bodyText}</span>
        </Toast.Body>
      </Toast>
    </div>
  );
};

export default CustomToast;
