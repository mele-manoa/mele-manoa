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
    <Container fluid id="landing" className="px-0">
      <Container id="landing-center" className="d-flex align-items-center justify-content-center">
        <Row className="text-center">
          <Col className="d-flex flex-column justify-content-center">
            <h1 className="display-2"><strong>Welcome to</strong></h1>
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
            ) : (
              <Col className="d-grid gap-2 col-6 mx-auto">
                <Button className="btn btn-light btn-lg py-3" as={NavLink} to="/discover">
                  <strong>Discover Other Musicians</strong>
                </Button>
                <Button className="btn btn-light btn-lg py-3" as={NavLink} to="/profile">
                  <strong>View Your Profile</strong>
                </Button>
              </Col>
            )}
          </Nav>
        </Row>
      </Container>
      <Container fluid id="info" className="mt-5">
        <Container className="py-5">
          <h1>What is Mele Manoa?</h1>
          <p>
            Mele Manoa is a web application designed to bring musicians of UH together for jam sessions or
            performing bands. It is an easy way for them to find others with similar tastes and compatible musical
            abilities, by allowing students to create a profile indicating their musical tastes, their musical
            capabilities, and their musical goals.
          </p>
          <p>
            Simply log in, create your profile, and look for other musicians to jam with!
          </p>
        </Container>
      </Container>
    </Container>
  );
};

export default Landing;
