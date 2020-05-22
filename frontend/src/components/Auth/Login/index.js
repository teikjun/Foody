import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Container } from "react-bootstrap";

import EmailForm from "./emailForm";
import PasswordForm from "./passwordForm";
import ChooseUserType from "./chooseUserType";

const Login = (props) => {
  // Redirect to dashboard if logged in
  useEffect(() => {
    if (props.isLoggedIn) {
      props.history.push("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isLoggedIn]);

  const redirectToSignup = () => props.history.push("/signup");

  return (
    <Container>
      {props.userType === "" ? (
        <ChooseUserType redirectToSignup={redirectToSignup} />
      ) : !props.isValidEmail ? (
        <EmailForm redirectToSignup={redirectToSignup} />
      ) : (
        <PasswordForm redirectToSignup={redirectToSignup} />
      )}
    </Container>
  );
};

const mapStateToProps = (state) => ({
  isValidEmail: state.login.isValidEmail,
  isLoggedIn: state.auth.isLoggedIn,
  userType: state.login.userType,
});

export default withRouter(connect(mapStateToProps)(Login));
