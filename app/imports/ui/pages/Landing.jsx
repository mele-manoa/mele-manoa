import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container className="row d-flex align-items-center justify-content-center" id="centerText">
    <Row className="align-middle text-center">
      <Col className="d-flex flex-column justify-content-center">
        <h1 className="display-1"><strong>Welcome to</strong></h1>
        <h1 className="display-1"><strong>Mele-Manoa</strong></h1>
      </Col>
    </Row>
  </Container>
);

export default Landing;
