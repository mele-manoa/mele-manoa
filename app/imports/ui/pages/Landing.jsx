import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Button, Col, Container, Row, Nav, Image } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

/* A simple static component to render some text for the landing page. */
const Landing = () => {
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);
  return (
    <Container className="d-flex align-items-center justify-content-center" id="landing-center">
      <Row className="text-center">
        <Col className="d-flex flex-column justify-content-center">
          <h1 className="display-1"><strong>Welcome to</strong></h1>
          <Col className="align-middle text-center py-4">
            <Image src="/images/mele-manoa-logo.png" width="700px" />
          </Col>
        </Col>
        <Nav className="justify-content-end">
          {currentUser === '' ? (
            <Col className="d-grid gap-2 col-6 mx-auto">
              <Button className="btn btn-light btn-lg py-3" as={NavLink} to="/register">
                <strong>Register</strong>
              </Button>
              <Button className="btn btn-light btn-lg py-3" as={NavLink} to="/signin">
                <strong>Sign in</strong>
              </Button>
            </Col>
          ) : ''}
        </Nav>
      </Row>
    </Container>
  );
};

export default Landing;
