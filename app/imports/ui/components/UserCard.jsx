import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Badge, Button } from 'react-bootstrap';
import { Youtube, CloudyFill, Instagram } from 'react-bootstrap-icons'

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const UserCard = ({ info }) => (
  <Card className="m-3">
    <Card.Body className="d-flex">
      <div id="user-card-info" className="me-3">
        <Card.Title>{info.name}</Card.Title>
        <Card.Text><Badge bg="secondary">{info.instrument}</Badge></Card.Text>
        <Card.Text>
          Preferred Genre: {info.genre} <br />
          Skill Level: {info.skill}
        </Card.Text>
        <Card.Text>
          { info.informalJam === true ? (
            <Badge bg="light" text="dark">Available for Informal Jam</Badge>
          ) : ''}
          { info.seekingBand === true ? (
            <Badge bg="light" text="dark">Seeking a Band</Badge>
          ) : ''}
        </Card.Text>
        <Card.Text>
          { info.youtube !== '' || null ? (
            <Button href={info.youtube} className="on-white me-1" variant="secondary" size="sm"><Youtube /></Button>
          ) : ''}
          { info.soundcloud !== '' || null ? (
            <Button href={info.soundcloud} className="on-white me-1" variant="secondary" size="sm"><CloudyFill /></Button>
          ) : ''}
          { info.instagram !== '' || null ? (
            <Button href={info.instagram} className="on-white me-1" variant="secondary" size="sm"><Instagram /></Button>
          ) : ''}
        </Card.Text>
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