import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';

const Profile = () => (
  <Container id="profile" className="bg-white p-5">
    <Row className="justify-content-center">
      <Col>
        <h1>Your Profile</h1>
        <ul>
          <li>Name</li>
          <li>Instrument</li>
          <li>Genre</li>
          <li>Skill</li>
          <li>Open to Informal Jam</li>
          <li>Seeking a band</li>
        </ul>
      </Col>
      <Col>
        Image Goes here
      </Col>
    </Row>
  </Container>
);

export default Profile;
