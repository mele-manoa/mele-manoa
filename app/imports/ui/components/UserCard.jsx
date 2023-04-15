import React from 'react';
import PropTypes from 'prop-types';
import { Card, Row, Col, Image, Badge } from 'react-bootstrap';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const UserCard = ({ info }) => (
  <Card>
    <Card.Body>
      <Row>
        <Col>
          <Card.Title>{info.name}</Card.Title>
          <Card.Subtitle>{info.instrument}</Card.Subtitle>
          <br />
          <Card.Text>
            Preferred Genre: {info.genre} <br />
            Skill Level: {info.skill}
          </Card.Text>
          { info.informalJam === true ? (
            <Card.Text><Badge bg="light" text="dark">Available for Informal Jam</Badge></Card.Text>
          ) : ''}
          { info.seekingBand === true ? (
            <Badge bg="light" text="dark">Seeking a Band</Badge>
          ) : ''}
        </Col>
        <Col>
          <Card.Text><Image id="user-image" src={info.image} thumbnail /></Card.Text>
        </Col>
      </Row>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
UserCard.propTypes = {
  info: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    instrument: PropTypes.string,
    genre: PropTypes.string,
    skill: PropTypes.string,
    informalJam: PropTypes.bool,
    seekingBand: PropTypes.bool,
    youtube: PropTypes.string,
    soundcloud: PropTypes.string,
    instagram: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default UserCard;