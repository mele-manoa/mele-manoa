import React from 'react';
import { Container } from 'react-bootstrap';
// import UserCard from '../components/UserCard';

const Groups = () => {

  return (
    <Container id="groups" className="d-flex bg-white p-5">
      <div id="groups-main" className="me-auto">
        <h1>Groups</h1>
        <div id="groups-cards" className="d-flex" />
      </div>
      <div id="groups-sidebar" className="p-3">
        <p>Filter By</p>
        <ul>
          <li>Genres</li>
          <ul>
            <li>Rock</li>
            <li>Jazz</li>
            <li>EDM</li>
            <li>Dubstep</li>
            <li>Country</li>
            <li>Pop</li>
            <li>Classical</li>
            <li>RhythmAndBlues</li>
          </ul>
          <li>Skill Level</li>
          <ul>
            <li>Beginner</li>
            <li>Intermediate</li>
            <li>Expert</li>
            <li>Professional</li>
          </ul>
          <li>Seeking Band Member</li>
        </ul>
      </div>
    </Container>
  );
};

export default Groups;
