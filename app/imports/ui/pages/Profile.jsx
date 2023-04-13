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
  </Container>
);

export default Profile;
