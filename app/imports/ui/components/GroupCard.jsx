import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Badge, Button } from 'react-bootstrap';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const GroupCard = ({ info }) => (
  <Card id="user-card" className="m-3">
    <Card.Body className="d-flex">
      <div id="user-card-info" className="me-3">
        <Card.Title>{info.name}</Card.Title>
        <Card.Text><Badge bg="secondary">{info.genre}</Badge></Card.Text>
        <Card.Text>
          Members
          <ul>
            {info.members.map((member) => (<li>{member}</li>))}
          </ul>
        </Card.Text>
        <Card.Text>
          { info.openToMember === true ? (
            <Badge bg="light" text="dark">Open to New Members</Badge>
          ) : ''}
        </Card.Text>
      </div>
      <Image id="user-image" className="float-right" src={info.image} thumbnail />
    </Card.Body>
    <Card.Footer />
  </Card>
);

// Require a document to be passed to this component.
GroupCard.propTypes = {
  info: PropTypes.shape({
    name: PropTypes.string,
    genre: PropTypes.string,
    members: PropTypes.arrayOf(String),
    openToMember: PropTypes.bool,
    _id: PropTypes.string,
  }).isRequired,
};

export default GroupCard;
