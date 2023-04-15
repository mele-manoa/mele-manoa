import React from 'react';
import PropTypes from 'prop-types';
import { Card, Row, Col, Image } from 'react-bootstrap';

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
        </Col>
        <Col>
          <Image id="user-image" src={info.image} thumbnail />
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
    _id: PropTypes.string,
  }).isRequired,
};

export default UserCard;