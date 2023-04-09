import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Button, Col, Container, Row, Nav, ButtonGroup } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

/* A simple static component to render some text for the landing page. */
const Landing = () => {
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);
  return (
    <Container className="d-flex align-items-center justify-content-center" id="centerText">
      <Row className="align-middle text-center">
        <Col className="d-flex flex-column justify-content-center">
          <h1 className="display-1"><strong>Welcome to</strong></h1>
          <h1 className="display-1"><strong>Mele-Manoa</strong></h1>
        </Col>
        <Nav className="justify-content-end">
          {currentUser === '' ? (
            <ButtonGroup className="d-grid gap-2 col-6 mx-auto">
              <Button className="btn btn-light btn-lg" id="button-signin" as={NavLink} to="/signin">
                Sign in
              </Button>
              <Button className="btn btn-light btn-lg" id="buttonregister" as={NavLink} to="/signup">
                Register
              </Button>
            </ButtonGroup>
          ) : ''}
        </Nav>
      </Row>
    </Container>
  );
};

export default Landing;
