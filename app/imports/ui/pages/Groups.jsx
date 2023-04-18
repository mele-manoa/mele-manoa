import React from 'react';
import { Container, Accordion, ListGroup } from 'react-bootstrap';
// import UserCard from '../components/UserCard';

const Groups = () => {
  const genres = ['Rock', 'Jazz', 'EDM', 'Dubstep', 'Country', 'Pop', 'Classical', 'RhythmAndBlues'];
  const skill = ['Beginner', 'Intermediate', 'Expert', 'Professional'];

  const check = [];
  for (let i = 0; i < 8; i++) {
    check[i] = true;
  }

  const changeStateGenre = (key) => {
    const child = document.getElementById('genre-group').children.item(key);
    check[key] === false ? (child.classList.add('active')) : (child.classList.remove('active'));
    check[key] = !check[key];
  };
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
                  <ListGroup id="genre-group" variant="flush">
                    {genres.map((genre, key) => (
                      <ListGroup.Item
                        action
                        key={key}
                        className="active"
                        onClick={() => { changeState(key); }}
                      >
                        {genre}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Skill Level</Accordion.Header>
                <Accordion.Body className="p-0">
                  <ListGroup variant="flush">
                    {skill.map((level) => (<ListGroup.Item>{level}</ListGroup.Item>))}
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
