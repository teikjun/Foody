import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";

import AccountSettingsWrapper from "./components/Wrappers/accountSettingsWrapper";
import DashboardWrapper from "./components/Wrappers/dashboardWrapper";
import FdsNavbar, { CustomerNavLinks } from "components/fdsNavbar";
import OrdersPage from "components/Customers/ordersPage";
import ReviewsPage from "components/Customers/reviewsPage";

export default function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userType = useSelector((state) => state.auth.userType);

  function customisedNavbar() {
    switch (userType) {
      case "customers":
        return <FdsNavbar navLinks={CustomerNavLinks()} />;
      default:
        return <FdsNavbar />;
    }
  }

  const NavRoute = ({ exact, path, component: Component }) => {
    return (
      <Route
        exact={exact}
        path={path}
        render={(props) => (
          <div>
            {customisedNavbar()}
            <Component {...props} />
          </div>
        )}
      />
    );
  };

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/dashboard">
            {!isLoggedIn ? <Redirect to="/login" /> : <NavRoute component={DashboardWrapper} />}
          </Route>
          <Route exact path="/orders">
            {!isLoggedIn ? <Redirect to="/login" /> : <NavRoute component={OrdersPage} />}
          </Route>
          <Route exact path="/reviews">
            {!isLoggedIn ? <Redirect to="/login" /> : <NavRoute component={ReviewsPage} />}
          </Route>
          <Route exact path="/accountsettings">
            {!isLoggedIn ? (
              <Redirect to="/login" />
            ) : (
              <NavRoute component={AccountSettingsWrapper} />
            )}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
