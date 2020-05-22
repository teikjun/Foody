import React, { useState } from "react";
import { connect } from "react-redux";
import { Container, Form, Row, Col, InputGroup } from "react-bootstrap";
import FA from "react-fontawesome";
import { filterFoodData } from "actions/foodActions";

const FilterForm = (props) => {
  const { dispatch } = props;
  const [inputs, setInputs] = useState("");

  const handleInputChange = (e) => {
    e.persist();
    setInputs(e.target.value);
    dispatch(filterFoodData(e.target.value));
  };

  return (
    <Container style={{ paddingTop: "2rem" }}>
      <Form style={{ paddingBottom: "1rem" }}>
        <Row>
          <Col>
            <InputGroup>
              <Form.Group controlId="input" style={{ width: "100%" }}>
                <Form.Control
                  type="text"
                  value={inputs}
                  style={{ paddingLeft: "40px", borderRadius: "30px" }}
                  placeholder="Enter food or restaurant"
                  onChange={handleInputChange}
                />
              </Form.Group>
              <div style={{ color: "grey", position: "absolute", left: "15px", top: "5px" }}>
                <FA name="search" />
              </div>
            </InputGroup>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(FilterForm);
