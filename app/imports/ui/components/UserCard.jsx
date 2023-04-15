import React from 'react';
import PropTypes from 'prop-types';
import { Card, Row, Col, Image, Badge } from 'react-bootstrap';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const UserCard = ({ info }) => (
  <Card className="m-3">
    <Card.Body className="d-flex">
      <div id="user-card-info" className="me-3">
        <Card.Title>{info.name}</Card.Title>
        <Card.Subtitle>{info.instrument}</Card.Subtitle>
        <Card.Text>
          Preferred Genre: {info.genre} <br />
          Skill Level: {info.skill}
        </Card.Text>
        { info.informalJam === true ? (
          <Badge bg="light" text="dark">Available for Informal Jam</Badge>
        ) : ''}
        { info.seekingBand === true ? (
          <Badge bg="light" text="dark">Seeking a Band</Badge>
        ) : ''}
      </div>
      <Image id="user-image" className="float-right" src={info.image} thumbnail />
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