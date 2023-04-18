import React from 'react';
import { Container, Accordion, ListGroup } from 'react-bootstrap';
// import UserCard from '../components/UserCard';

const Groups = () => {

  return (
    <Container id="groups" className="d-flex bg-white p-5">
      <div id="groups-main" className="me-auto">
        <h1>Groups</h1>
        <div id="groups-cards" className="d-flex" />
      </div>
      <div id="groups-sidebar" className="p-3">
        <h4>Filter By</h4>
        <ListGroup>
          <ListGroup.Item className="p-0">
            <Accordion defaultActiveKey="0" flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Genres</Accordion.Header>
                <Accordion.Body className="p-0">
                  <ListGroup variant="flush">
                    <ListGroup.Item>Rock</ListGroup.Item>
                    <ListGroup.Item>Jazz</ListGroup.Item>
                    <ListGroup.Item>EDM</ListGroup.Item>
                    <ListGroup.Item>Dubstep</ListGroup.Item>
                    <ListGroup.Item>Country</ListGroup.Item>
                    <ListGroup.Item>Pop</ListGroup.Item>
                    <ListGroup.Item>Classical</ListGroup.Item>
                    <ListGroup.Item>Rhythm And Blues</ListGroup.Item>
                  </ListGroup>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Skill Level</Accordion.Header>
                <Accordion.Body className="p-0">
                  <ListGroup variant="flush">
                    <ListGroup.Item>Beginner</ListGroup.Item>
                    <ListGroup.Item>Intermediate</ListGroup.Item>
                    <ListGroup.Item>Expert</ListGroup.Item>
                    <ListGroup.Item>Professional</ListGroup.Item>
                  </ListGroup>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </ListGroup.Item>
          <ListGroup.Item>Seeking Band Member</ListGroup.Item>
        </ListGroup>
      </div>
    </Container>
  );
};

export default Groups;
