import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Container, Col, Row, Modal, Button, Alert } from "react-bootstrap";
import { setUserType } from "actions/loginActions";

const ChooseUserType = (props) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    props.dispatch(setUserType(event.target.name));
  };

  return (
    <Modal.Dialog centered>
      <Modal.Header>
        <Col>
          <Row style={{ justifyContent: "center", color: "grey" }}>
            <Modal.Title>User Login</Modal.Title>
          </Row>
        </Col>
      </Modal.Header>

      <Modal.Body>
        <Container>
          <Button variant="info" type="submit" name="customers" block onClick={handleSubmit}>
            Customer
          </Button>
          <Button variant="info" type="submit" name="restaurantstaff" block onClick={handleSubmit}>
            Restaurant Staff
          </Button>
          <Button variant="info" type="submit" name="deliveryriders" block onClick={handleSubmit}>
            Delivery Rider
          </Button>
          <Button variant="info" type="submit" name="managers" block onClick={handleSubmit}>
            FDS Manager
          </Button>
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

export default withRouter(connect()(ChooseUserType));
