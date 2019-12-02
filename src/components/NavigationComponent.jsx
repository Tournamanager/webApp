import React, {useState} from "react";
import {Link} from "react-router-dom";
import {Collapse, DropdownItem, DropdownMenu, DropdownToggle, NavbarToggler, UncontrolledDropdown} from "reactstrap";
import firebase from "firebase";

const NavigationComponent = props => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
      <div className="navbar navbar-expand-md navbar-dark bg-dark mb-2">
        <Link className="navbar-brand" to="/">Home</Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} className="navbar-collapse">
            {props.isSignedIn ? (
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/tournaments">
                      Tournaments
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/team/create">
                  CreateTeam
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">
                  Teams
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav mr-auto">
              </ul>
            )}
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
