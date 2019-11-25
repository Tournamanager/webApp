import React, { useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import firebase from "firebase";

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
} from "reactstrap";

const Navigator = props => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Router>
      <div>
        {props.isSignedIn ? (
          <div>
            <Navbar color="light" light expand="md">
              <NavbarBrand to="/">Tournamanager</NavbarBrand>
              <span className="welkomNav">
                Welcome {firebase.auth().currentUser.email}
              </span>
              <NavbarToggler onClick={toggle} />
              <Collapse isOpen={isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <Link className="link" to="/users">
                      Users
                    </Link>
                  </NavItem>

                  <NavItem>
                    <Link className="link" to="/myProfile">
                      my profile
                    </Link>
                  </NavItem>

                  <NavItem>
                    <NavLink to="/" onClick={() => firebase.auth().signOut()}>
                      Logout
                    </NavLink>
                  </NavItem>

                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      Options
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>Option 1</DropdownItem>
                      <DropdownItem>Option 2</DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem>Reset</DropdownItem>
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
                    <NavLink href="/login">Login</NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
          </div>
        )}
      </div>
    </Router>
  );
};

export default Navigator;
