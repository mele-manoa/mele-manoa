import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Badge, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Youtube, CloudyFill, Instagram } from 'react-bootstrap-icons';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const UserCard = ({ info }) => (
  <Card id="user-card" className="m-3">
    <Card.Body className="d-flex">
      <div id="user-card-info" className="me-3">
        <Card.Title>{info.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted" style={{ fontSize: '14px' }}><i>{info.email}</i></Card.Subtitle>
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
      </div>
      <Image id="user-image" className="float-right" src={info.image} thumbnail />
    </Card.Body>
    <Card.Footer>
      { [info.youtube, info.soundcloud, info.instagram].map((link) => (
        (link !== undefined) ? (
          <OverlayTrigger
            overlay={(
              <Tooltip>
                { link === info.youtube ? (<strong>Youtube</strong>) : '' }
                { link === info.soundcloud ? (<strong>SoundCloud</strong>) : '' }
                { link === info.instagram ? (<strong>Instagram</strong>) : '' }
              </Tooltip>
            )}
          >
            <Button href={link} className="on-white me-1" variant="secondary" size="sm">
              { link === info.youtube ? (<Youtube />) : '' }
              { link === info.soundcloud ? (<CloudyFill />) : '' }
              { link === info.instagram ? (<Instagram />) : '' }
            </Button>
          </OverlayTrigger>
        ) : (
          ''
        )
      ))}
    </Card.Footer>
  </Card>
);

// Require a document to be passed to this component.
UserCard.propTypes = {
  info: PropTypes.shape({
    email: PropTypes.string,
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
