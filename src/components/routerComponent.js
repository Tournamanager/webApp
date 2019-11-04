import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Users from "./usersComponent";
import Home from "./homeComponent";
import MyProfile from "./profileComponent";

export default function Navigator() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/myProfile">My profile</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
          </Route>

          <Route path="/users">
            <Users />
          </Route>

          <Route path="/myProfile">
            <MyProfile />
          </Route>

          <Route path="/">
            <Home />
          </Route>

        </Switch>

      </div>
    </Router>
  );
}
