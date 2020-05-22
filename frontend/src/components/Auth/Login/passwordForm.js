import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Container, Col, Row, Modal, Button, Form, Alert, Spinner } from "react-bootstrap";
import Stepper from "react-stepper-horizontal";

import { validatePassword, clearForm } from "actions/loginActions";
import { unsetUser } from "actions/authActions";

const PasswordForm = (props) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // Helper functions
  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    setError(null);
    await props.dispatch(validatePassword(props.email, props.userType, password));
  };

  const handleChange = (event) => {
    event.persist();
    setPassword(event.target.value);
  };

  const onBackButton = () => {
    props.dispatch(clearForm());
    props.dispatch(unsetUser());
  };

  return (
    <Modal.Dialog centered>
      <Modal.Header>
        <Col>
          <Row>
            <Button variant="outline-info" size="sm" onClick={onBackButton}>
              {"<"}
            </Button>
          </Row>
          <Row style={{ justifyContent: "center", color: "grey" }}>
            <Modal.Title>User Login</Modal.Title>
          </Row>
          <Row>
            <Stepper
              steps={[{ title: "Enter Email" }, { title: "Enter Password" }, { title: "Success!" }]}
              activeStep={1}
              lineMarginOffset={1}
              circleTop={20}
              circleFontSize={18}
              size={45}
            />
          </Row>
        </Col>
      </Modal.Header>

      <Modal.Body>
        <Container>
          <Form onSubmit={handleSubmit}>
            {/* Password Form */}
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                name="password"
                onChange={handleChange}
                value={password}
                type="password"
              />
            </Form.Group>

            {/* Error Alerts */}
            {error ? (
              <Alert variant="danger">{error}</Alert>
            ) : props.error ? (
              <Alert variant="danger">{props.error}</Alert>
            ) : null}

            {/* Submit Button */}
            {props.loading ? (
              <Button variant="info" disabled type="submit" block>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                <span>{` `}Loading...</span>
              </Button>
            ) : (
              <Button variant="info" type="submit" block>
                Log In
              </Button>
            )}
          </Form>
        </Container>
      </Modal.Body>

      <Modal.Footer>
        <Alert>
          Don't Have An Account?{` `}
          <Alert.Link href="#" onClick={props.redirectToSignup}>
            Sign Up Here!
          </Alert.Link>
        </Alert>
      </Modal.Footer>
    </Modal.Dialog>
  );
};

const mapStateToProps = (state) => ({
  email: state.login.email,
  loading: state.login.loading,
  error: state.login.error,
  isValidPassword: state.login.isValidPassword,
  userType: state.login.userType,
});

export default withRouter(connect(mapStateToProps)(PasswordForm));
