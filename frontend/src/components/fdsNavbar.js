import React from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import { Container, Navbar, Nav, Dropdown } from "react-bootstrap";
import { unsetUser } from "actions/authActions";
import FA from "react-fontawesome";
import "assets/navbar.css";
import { resetCurrentOrder } from "actions/orderActions";

export const CustomerNavLinks = () => {
  return (
    <div>
      <Navbar.Text style={{ padding: "0 1rem" }}>
        <NavLink
          style={{ color: "lightgrey" }}
          activeStyle={{
            borderBottom: "solid 0.5px white",
          }}
          to="/orders"
        >
          My Orders
        </NavLink>
      </Navbar.Text>
      <Navbar.Text style={{ padding: "0 1rem" }}>
        <NavLink
          style={{ color: "lightgrey" }}
          activeStyle={{
            borderBottom: "solid 0.5px white",
          }}
          to="/reviews"
        >
          Reviews
        </NavLink>
      </Navbar.Text>
    </div>
  );
};

const FDSNavbar = (props) => {
  // Helper functions
  const handleAccountSettings = () => {
    props.history.push("/accountsettings");
  };

  const handleSignOut = () => {
    props.history.push("/login");
    props.dispatch(unsetUser());
    props.dispatch(resetCurrentOrder());
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container style={{ padding: "0 15px" }}>
          <Navbar.Brand
            style={{ marginRight: "1.5rem", cursor: "pointer" }}
            onClick={() => {
              props.history.push("/dashboard");
            }}
          >
            FDS
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav style={{ marginRight: "auto" }}>{props.navLinks}</Nav>
            <Nav>
              <Navbar.Text style={{ marginRight: "1rem" }}>
                Signed in as: {props.authedEmail}
              </Navbar.Text>
              <Dropdown alignRight>
                <Dropdown.Toggle
                  id="settings"
                  style={{ backgroundColor: "transparent", borderColor: "white" }}
                >
                  <FA name="cog" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleAccountSettings}>Account Settings</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleSignOut}>
                    <span style={{ color: "red" }}>Sign out</span>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

const mapStateToProps = (state) => ({
  authedEmail: state.auth.authedEmail,
  userType: state.auth.userType,
  userId: state.auth.uid,
});

export default withRouter(connect(mapStateToProps)(FDSNavbar));
