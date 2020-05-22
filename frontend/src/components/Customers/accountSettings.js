import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Container, Modal, Button, Form, FormControl, InputGroup, Alert } from "react-bootstrap";
import FA from "react-fontawesome";

import { changePassword, deleteUser, changeCreditCard } from "actions/accountSettingsActions";
import "assets/account-settings.css";

const CustomerAccountSettings = (props) => {
  const {
    rewardPoints,
    uid,
    changePasswordErrorMsg,
    changePasswordSuccessMsg,
    changeCreditCardSuccessMsg,
    changeCreditCardErrorMsg,
    dispatch,
  } = props;
  const [inputPassword, setInputPassword] = useState("");
  const [inputCreditCard, setInputCreditCard] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChangePassword = (e) => {
    e.preventDefault();
    setInputPassword("");
    setInputCreditCard("");
    dispatch(changePassword(uid, inputPassword));
  };

  const handleChangeCreditCard = (e) => {
    e.preventDefault();
    setInputPassword("");
    setInputCreditCard("");
    dispatch(changeCreditCard(uid, inputCreditCard));
  };

  const handleDeleteUser = (e) => {
    e.preventDefault();
    setShow(false);
    dispatch(deleteUser(uid));
  };

  const handleChange = (event) => {
    if (event.target.name === "password") setInputPassword(event.target.value);
    else setInputCreditCard(event.target.value);
  };

  return (
    <div>
      <Container style={{ marginTop: "2rem" }}>
        <h1 style={{ textAlign: "center", paddingBottom: "1rem" }}>Account Settings</h1>
        <h3 style={{ textAlign: "center", paddingBottom: "2rem" }}>
          Reward Points: {rewardPoints}
        </h3>
        <h3>Change Password</h3>
        <Form style={{ margin: "1rem 0" }} onSubmit={handleChangePassword}>
          <InputGroup>
            <FormControl
              name="password"
              required
              minLength="6"
              onChange={handleChange}
              type="password"
              placeholder="Change Password"
              value={inputPassword}
            />
            <InputGroup.Append>
              <Button type="submit">Submit</Button>
            </InputGroup.Append>
          </InputGroup>
          <br></br>
          {changePasswordErrorMsg ? (
            <Alert variant="danger">{changePasswordErrorMsg}</Alert>
          ) : changePasswordSuccessMsg ? (
            <Alert variant="success">{changePasswordSuccessMsg}</Alert>
          ) : null}
        </Form>
        <h3>Add/Change Credit Card</h3>
        <Form style={{ margin: "1rem 0" }} onSubmit={handleChangeCreditCard}>
          <InputGroup>
            <FormControl
              name="creditcard"
              required
              onChange={handleChange}
              type="text"
              placeholder="Add/Change Credit Card"
              value={inputCreditCard}
            />
            <InputGroup.Append>
              <Button type="submit">Submit</Button>
            </InputGroup.Append>
          </InputGroup>
          <br></br>
          {changeCreditCardErrorMsg ? (
            <Alert variant="danger">{changeCreditCardErrorMsg}</Alert>
          ) : changeCreditCardSuccessMsg ? (
            <Alert variant="success">{changeCreditCardSuccessMsg}</Alert>
          ) : null}
        </Form>
        <Button onClick={handleShow} variant="danger">
          Delete Account
        </Button>
        <Modal dialogClassName="ac-modal" show={show} onHide={handleClose}>
          <Modal.Header>
            <div style={{ color: "red" }}>
              <FA name="times-circle" size="4x" />
            </div>
            <Modal.Title>Are you sure</Modal.Title>
          </Modal.Header>
          <Modal.Body>Do you really want to delete your account.</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteUser}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  uid: state.auth.uid,
  changePasswordErrorMsg: state.accountSettings.changePasswordErrorMsg,
  changePasswordSuccessMsg: state.accountSettings.changePasswordSuccessMsg,
  changeCreditCardErrorMsg: state.accountSettings.changeCreditCardErrorMsg,
  changeCreditCardSuccessMsg: state.accountSettings.changeCreditCardSuccessMsg,
  rewardPoints: state.auth.rewardPoints,
  deleteUserErrorMsg: state.accountSettings.deleteUserErrorMsg,
});

export default withRouter(connect(mapStateToProps)(CustomerAccountSettings));
