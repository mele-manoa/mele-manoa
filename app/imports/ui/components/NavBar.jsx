import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Button, Container, Nav, Navbar, Dropdown, Image } from 'react-bootstrap';

const NavBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  return (
    <Navbar className="navbar navbar-light" expand="lg" id="navbar">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <Nav className="justify-content-start navbar-nav">
            <Image src="/images/mele-manoa-logo.png" width="200px" />
          </Nav>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-start">
            {currentUser ? ([
              <Nav.Link id="add-stuff-nav" as={NavLink} to="/add" key="add">Add Stuff</Nav.Link>,
              <Nav.Link id="list-stuff-nav" as={NavLink} to="/list" key="list">List Stuff</Nav.Link>,
            ]) : ''}
            {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
              <Nav.Link id="list-stuff-admin-nav" as={NavLink} to="/admin" key="admin">Admin</Nav.Link>
            ) : ''}
          </Nav>
          <Nav className="justify-content-end">
            {currentUser === '' ? (
              <Container>
                <Button className="btn btn-light" as={NavLink} to="/signup">
                  <strong>Register</strong>
                </Button>
                <Button className="btn btn-light mx-3" as={NavLink} to="/signin">
                  <strong>Sign in</strong>
                </Button>
              </Container>
            ) : (
              <Dropdown>
                <Dropdown.Toggle variant="btn btn light" id="navbar-current-user">
                  {currentUser}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item id="navbar-sign-out" as={NavLink} to="/" onClick={() => Meteor.logout()}>
                    {' '}
                    Sign out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
