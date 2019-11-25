import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Users from "./usersComponent";
import Home from "./homeComponent";
import MyProfile from "./profileComponent";
import Teams from './teamsComponent';
import firebase from "firebase"

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';


const Navigator = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  console.log(props.isSignedIn)

  return (
    <Router>
      <div>
        {props.isSignedIn ? (
          <div>
            <Navbar color="light" light expand="md">
              <NavbarBrand href="/">Tournamanager</NavbarBrand>
              <span className="welkomNav">Welcome {firebase.auth().currentUser.email}</span>
              <NavbarToggler onClick={toggle} />
              <Collapse isOpen={isOpen} navbar>
                <Nav className="ml-auto" navbar>

                  <NavItem>
                    <Link className="link" to="/users">Users</Link>
                  </NavItem>

                  <NavItem>
                    <Link className="link" to="/teams">Teams</Link>
                  </NavItem>

                  <NavItem>
                    <Link className="link" to="/myProfile">My profile</Link>
                  </NavItem>

                  <NavItem>
                    <NavLink href="/" onClick={() => firebase.auth().signOut()}>Logout</NavLink>
                  </NavItem>

                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      Options
              </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>
                        Option 1
                </DropdownItem>
                      <DropdownItem>
                        Option 2
                </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem>
                        Reset
                </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>

                  {/* <NavItem>
                <NavLink href="/">Login</NavLink>
              </NavItem> */}
                </Nav>
              </Collapse>
            </Navbar>
          </div>
        ) : (
            <div>
              <Navbar color="light" light expand="md">
                <NavbarBrand href="/">Tournamanager</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                  <Nav className="ml-auto" navbar>
                    <NavItem>
                      <NavLink href="/">Login</NavLink>
                    </NavItem>
                  </Nav>
                </Collapse>
              </Navbar>
            </div>
          )}
        
        {props.isSignedIn ? (
          <Switch>
            <Route path="/about">
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/teams">
              <Teams />
            </Route>
            <Route path="/myProfile">
              <MyProfile />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        ) : (
            <Switch>
              <Route path="/"></Route>
            </Switch>
          )}

      </div>
    </Router>
  );
}

export default Navigator;

