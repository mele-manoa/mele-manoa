import React from 'react';
import { Container, ListGroup } from 'react-bootstrap';
// import UserCard from '../components/UserCard';

const Groups = () => {

  return (
    <Container id="groups" className="d-flex bg-white p-5">
      <div id="groups-main" className="me-auto">
        <h1>Groups</h1>
        <div id="groups-cards" className="d-flex" />
      </div>
      <div id="groups-sidebar" className="p-3">
        <h2>Filter By</h2>
        <h4>Genres</h4>
        <ListGroup>
          <ListGroup.Item>Rock</ListGroup.Item>
          <ListGroup.Item>Jazz</ListGroup.Item>
          <ListGroup.Item>EDM</ListGroup.Item>
          <ListGroup.Item>Dubstep</ListGroup.Item>
          <ListGroup.Item>Country</ListGroup.Item>
          <ListGroup.Item>Pop</ListGroup.Item>
          <ListGroup.Item>Classical</ListGroup.Item>
          <ListGroup.Item>RhythmAndBlues</ListGroup.Item>
        </ListGroup>
        <h4>Skill Level</h4>
        <ListGroup>
          <ListGroup.Item>Beginner</ListGroup.Item>
          <ListGroup.Item>Intermediate</ListGroup.Item>
          <ListGroup.Item>Expert</ListGroup.Item>
          <ListGroup.Item>Professional</ListGroup.Item>
        </ListGroup>
        <h4>Seeking Band Member</h4>
      </div>
    </Container>
  );
};

export default Groups;
