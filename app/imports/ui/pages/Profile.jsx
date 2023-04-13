import React from 'react';
import { Container } from 'react-bootstrap';

const Profile = () => (
  <Container id="profile" className="d-flex bg-white p-6">
    <div id="top-profile" className="p-4 me-auto">
      <h1>Profile</h1>
      <div id="discover-cards">
        <p>
          List of Profiles
        </p>
      </div>
    </div>
    <div id="sidebar" className="p-4">
      <p>Classified By</p>
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
      </ul>
    </div>
  </Container>
);

export default Profile;
