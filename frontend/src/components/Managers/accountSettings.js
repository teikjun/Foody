import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Container, Modal, Button, Form, FormControl, InputGroup, Alert } from "react-bootstrap";
import FA from "react-fontawesome";
import { changePassword, deleteUser } from "actions/accountSettingsActions";
import "assets/account-settings.css";

const ManagerAccountSettings = (props) => {
  const { uid, changePasswordErrorMsg, changePasswordSuccessMsg, dispatch } = props;
  const [input, setInput] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChangePassword = (e) => {
    e.preventDefault();
    dispatch(changePassword(uid, input));
  };

  const handleDeleteUser = (e) => {
    e.preventDefault();
    setShow(false);
    dispatch(deleteUser(uid));
  };

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <div>
      <Container style={{ marginTop: "2rem" }}>
        <h1 style={{ textAlign: "center", paddingBottom: "1rem" }}>Account Settings</h1>
        <h3>Change Password</h3>
        <Form style={{ margin: "1rem 0" }} onSubmit={handleChangePassword}>
          <InputGroup>
            <FormControl
              required
              minLength="6"
              onChange={handleChange}
              type="password"
              placeholder="Change Password"
              value={input}
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
  deleteUserErrorMsg: state.accountSettings.deleteUserErrorMsg,
});

export default withRouter(connect(mapStateToProps)(ManagerAccountSettings));
