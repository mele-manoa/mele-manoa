import React from 'react';
import { Container } from 'react-bootstrap';

const Discover = () => {
  return (
    <Container id="discover" className="d-flex bg-white p-5">
      <div id="discover-main" className="p-3">
        <h1>Discover</h1>
        <div id="discover-cards">
          <p>
            All the musicians go here
          </p>
        </div>
      </div>
      <div id="discover-sidebar" className="p-3">
        <p>Filter By</p>
        <ul>
          <li>Instruments</li>
          <ul>
          </ul>
        </ul>
      </div>
    </Container>
  );
};

export default Discover;
