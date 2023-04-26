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
    <Navbar id="navbar" className="navbar navbar-light" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <Nav className="justify-content-start navbar-nav">
            <Image src="/images/mele-manoa-logo.png" width="200px" />
          </Nav>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {currentUser !== '' ? (
            <Nav id="nav-links" className="justify-content-start mt-4 ms-3">
              {currentUser ? ([
                <Nav.Link id="profile-nav" as={NavLink} to="/profile" key="profile">Profile</Nav.Link>,
                <Nav.Link id="discover-nav" as={NavLink} to="/discover" key="discover">Discover</Nav.Link>,
                <Nav.Link id="groups-nav" as={NavLink} to="/groups" key="groups">Groups</Nav.Link>,
              ]) : ''}
              {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
                <Nav.Link id="admin-nav" as={NavLink} to="/admin" key="admin">Admin</Nav.Link>
              ) : ''}
            </Nav>
          ) : (
            <Nav />
          )}
          <Nav className="m-auto" />
          <Nav className="justify-content-end">
            {currentUser === '' ? (
              <Container>
                <Button id="register-nav" className="btn btn-light" as={NavLink} to="/register">
                  <strong>Register</strong>
                </Button>
                <Button id="signin-nav" className="btn btn-light mx-3" as={NavLink} to="/signin">
                  <strong>Sign in</strong>
                </Button>
              </Container>
            ) : (
              <Dropdown>
                <Dropdown.Toggle variant="btn btn light" id="navbar-current-user">
                  {currentUser}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item id="navbar-sign-out" href="/" onClick={() => Meteor.logout()}>
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
