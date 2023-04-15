import React from 'react';
import { Container } from 'react-bootstrap';
// import UserCard from '../components/UserCard';

const Discover = () => {

  return (
    <Container id="discover" className="d-flex bg-white p-5">
      <div id="discover-main" className="me-auto">
        <h1>Discover</h1>
        <div id="discover-cards" className="d-flex" />
      </div>
      <div id="discover-sidebar" className="p-3">
        <p>Filter By</p>
        <ul>
          <li>Instruments</li>
          <ul>
            <li>Guitar</li>
            <li>Bass</li>
            <li>Drums</li>
            <li>Vocals</li>
            <li>Keyboard/Piano</li>
            <li>Strings</li>
            <li>Winds</li>
            <li>Percussion</li>
            <li>Brass</li>
          </ul>
          <li>Genre</li>
          <li>Skill Level</li>
          <ul>
            <li>Beginner</li>
            <li>Intermediate</li>
            <li>Expert</li>
            <li>Professional</li>
          </ul>
          <li>Informal Jam?</li>
          <li>Seeking Band Member?</li>
        </ul>
      </div>
    </Container>
  );
};

export default Discover;
