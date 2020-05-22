import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import { Container, Col, Row, Modal, Button, Form, Alert, Spinner } from 'react-bootstrap';
import { signup, clearSignupForm } from "actions/signupActions"

const Signup = (props) => {
    const { dispatch } = props
    const [inputs, setInputs] = useState({ email: "", password: "", userType: "customers", confirmPassword: "", restaurantName: 1 })

    // Redirect if successful signup
    useEffect(() => {
        if (Object.entries(props.userInfo).length !== 0) {
            props.history.push("/dashboard")
        }
    }, [props.userInfo, props.history])


    // Helper functions
    const handleSubmit = async (event) => {
        event.preventDefault()
        event.stopPropagation()
        if (!checkValidForm()) {
            return
        }
        else {
            await props.dispatch(signup(inputs.email, inputs.userType, inputs.password, inputs.restaurantName))
        }
    }

    const handleChange = (event) => {
        event.persist()
        setInputs((prevInput) => ({ ...prevInput, [event.target.name]: event.target.value }))
    }

    /* Form Validation Helper Functions */
    const checkValidPassword = () => (inputs.password.length === 0 ? null : inputs.password.length >= 6)

    const checkMatchPassword = () => (inputs.password.length === 0 ? null : checkValidPassword() && inputs.password === inputs.confirmPassword);

    const checkValidEmail = () => (inputs.email.length === 0 ? null : /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(inputs.email));

    const checkValidForm = () => (checkValidEmail() && checkValidPassword() && checkMatchPassword())

    return <Modal.Dialog centered>
        <Modal.Header>
            <Col>
                <Row style={{ justifyContent: "center", color: "grey" }}>
                    <Modal.Title>User Sign Up</Modal.Title>
                </Row>
            </Col>
        </Modal.Header>

        <Modal.Body>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="userType">
                        <Form.Label>User Type</Form.Label>
                        <Form.Control name="userType" onChange={handleChange} as="select">
                            <option value="customers">Customer</option>
                            <option value="restaurantstaff">Restaurant Staff</option>
                            <option value="deliveryriders">Delivery Rider</option>
                            <option value="managers">Manager</option>
                        </Form.Control>
                    </Form.Group>
                    {inputs.userType === "restaurantstaff"
                    ?   <Form.Group controlId="restaurantName">
                            <Form.Label>Restaurant Name</Form.Label>
                            <Form.Control name="restaurantName" onChange={handleChange} as="select">
                                <option value="1">tian tian</option>
                                <option value="2">a1 bakkutteh place</option>
                                <option value="3">koi</option>
                                <option value="4">ameens</option>
                                <option value="5">prata house</option>
                                <option value="6">makcik shop</option>
                                <option value="7">astons</option>
                            </Form.Control>
                        </Form.Group>
                    : null}
                    {/* Email Form */}
                    <Form.Group controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            isValid={checkValidEmail()} isInvalid={checkValidEmail() === null ? null : !checkValidEmail()}
                            required name="email" onChange={handleChange} value={inputs.email} />
                        <Form.Control.Feedback type="invalid">
                            Please Enter a Valid Email
                        </Form.Control.Feedback>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    {/* Password Form */}
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            isValid={checkValidPassword()} isInvalid={checkValidPassword() === null ? null : !checkValidPassword()}
                            required name="password" type="password" onChange={handleChange} value={inputs.password}
                        />
                        <Form.Control.Feedback type="invalid">
                            Password has to be at least 6 characters!
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Confirm Password Form */}
                    <Form.Group controlId="confirm_password">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            isValid={checkMatchPassword()} isInvalid={checkMatchPassword() === null ? null : !checkMatchPassword()}
                            required name="confirmPassword" type="password" onChange={handleChange} value={inputs.confirmPassword} />
                        <Form.Control.Feedback type="invalid">
                            Make sure the passwords match!
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Error Alerts */}
                    {props.error
                        ? <Alert variant="danger">{props.error}</Alert>
                        : null
                    }

                    {/* Submit Button */}
                    {props.loading
                        ? <Button variant="info" disabled type="submit" block>
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                            <span>{` `}Loading...</span>
                        </Button>
                        : <Button variant="info" type="submit" block>
                            Create Account
                    </Button>
                    }
                </Form>
            </Container>
        </Modal.Body>

        <Modal.Footer>
            <Alert>
                Already Have An Account?{` `}
                <Alert.Link href="#" onClick={() => {
                    dispatch(clearSignupForm());
                    props.history.push('/login')}}>
                    Log In Here!
                </Alert.Link>
            </Alert>
        </Modal.Footer>
    </Modal.Dialog>
}

const mapStateToProps = state => ({
    userInfo: state.signup.userInfo,
    loading: state.signup.loading,
    error: state.signup.error,
});

export default withRouter(connect(mapStateToProps)(Signup));
