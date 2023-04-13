import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';

const Profile = () => (
  <Container id="profile" className="d-flex bg-white p-6">
    <Row className="justify-content-center">
      <Col xs={5}>
        <Col className="text-center py-4">
          <h2>Profile</h2>
        </Col>
        <Card>
          <Card.Body>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default Profile;
