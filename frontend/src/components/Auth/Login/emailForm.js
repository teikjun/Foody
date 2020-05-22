import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Container, Col, Row, Modal, Button, Form, Alert, Spinner } from "react-bootstrap";
import Stepper from "react-stepper-horizontal";

import { validateEmail, clearForm } from "actions/loginActions";
import { unsetUser } from "actions/authActions";

const EmailForm = (props) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  // Helper Functions
  const checkValidEmail = () =>
    email.length === 0 ? null : /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!checkValidEmail()) {
      setError("Invalid Email");
      return;
    } else {
      setError(null);
      await props.dispatch(validateEmail(email, props.userType));
    }
  };

  const handleChange = (event) => {
    event.persist();
    setEmail(event.target.value);
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
              activeStep={0}
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
            {/* Email Form */}
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control required name="email" onChange={handleChange} value={email} />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
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
                Next
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
  isValidEmail: state.login.isValidEmail,
  loading: state.login.loading,
  error: state.login.error,
  userType: state.login.userType,
});

export default withRouter(connect(mapStateToProps)(EmailForm));
