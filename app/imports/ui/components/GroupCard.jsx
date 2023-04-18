import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Badge } from 'react-bootstrap';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const GroupCard = ({ info }) => (
  <Card id="group-card" className="m-3">
    <Card.Body className="d-flex">
      <div id="group-card-info" className="me-3">
        <Card.Title>{info.name}</Card.Title>
        <Card.Text><Badge bg="secondary">{info.genre}</Badge></Card.Text>
        <Card.Text>
          Members
          {info.members.map((member) => (member))}
        </Card.Text>
        <Card.Text>
          { info.openToMember === true ? (
            <Badge bg="light" text="dark">Open to New Members</Badge>
          ) : ''}
        </Card.Text>
      </div>
      <Image id="group-image" className="float-right" src={info.image} thumbnail />
    </Card.Body>
    <Card.Footer />
  </Card>
);

// Require a document to be passed to this component.
GroupCard.propTypes = {
  info: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    genre: PropTypes.string,
    members: PropTypes.arrayOf(String),
    openToMember: PropTypes.bool,
    _id: PropTypes.string,
  }).isRequired,
};

export default GroupCard;
