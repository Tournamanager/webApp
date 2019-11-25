import React, {useState} from "react";
import {Link} from "react-router-dom";
import {Collapse, DropdownItem, DropdownMenu, DropdownToggle, NavbarToggler, UncontrolledDropdown} from "reactstrap";
import firebase from "firebase";

const NavigationComponent = props => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  function ifLoggedIn() {
    if (props.isSignedIn) {
      return (
        <li className="nav-item">
          <Link className="nav-link" to="/users">
            Users
          </Link>
        </li>
      )
    }
  }

  return (
      <div className="navbar navbar-expand-md navbar-dark bg-dark mb-5">
        <Link className="navbar-brand" to="/">Home</Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} className="navbar-collapse">
          <ul className="navbar-nav mr-auto">
            {ifLoggedIn()}
          </ul>
          <ul className="navbar-nav">
            {!props.isSignedIn ? (
              <li>
                <Link className="nav-link" to="/login">Login</Link>
              </li>
            ):(
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {firebase.auth().currentUser.email}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <Link style={{textDecoration: "inherit", color: "inherit"}} to="/user/profile">Profile</Link>
                  </DropdownItem>
                  <div className="dropdown-divider" />
                  <Link className="dropdown-item" to="/" onClick={() => firebase.auth().signOut()}>Logout</Link>
                </DropdownMenu>
              </UncontrolledDropdown>
            )}
          </ul>
        </Collapse>
      </div>
  );
};

export default NavigationComponent;
