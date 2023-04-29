import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Container, Accordion, ListGroup, Button } from 'react-bootstrap';
// import GroupCard from '../components/GroupCard';

const Groups = () => {
  const genres = ['Rock', 'Jazz', 'EDM', 'Dubstep', 'Country', 'Pop', 'Classical', 'Rhythm And Blues'];
  const skill = ['Beginner', 'Intermediate', 'Expert', 'Professional'];

  const genreState = [];
  for (let i = 0; i < genres.length; i++) {
    genreState[i] = true;
  }

  const skillState = [];
  for (let i = 0; i < skill.length; i++) {
    skillState[i] = true;
  }
  let seekingState = true;

  const changeGenreState = (key) => {
    const child = document.getElementById('genre-group').children.item(key);
    if (genreState[key] === false) {
      child.classList.add('active');
    } else {
      child.classList.remove('active');
    }
    genreState[key] = !genreState[key];
  };

  const changeSkillState = (key) => {
    const child = document.getElementById('skill-group').children.item(key);
    if (skillState[key] === false) {
      child.classList.add('active');
    } else {
      child.classList.remove('active');
    }
    skillState[key] = !skillState[key];
  };

  const changeSeekingState = () => {
    const seeking = document.getElementById('seeking-item');
    if (seekingState === false) {
      seeking.classList.add('active');
    } else {
      seeking.classList.remove('active');
    }
    seekingState = !seekingState;
  };

  return (
    <Container id="groups" className="d-flex bg-white p-5">
      <div id="groups-main" className="me-auto">
        <h1>Groups</h1>
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
          <Button id="add-group-button" href="/addgroup" className="on-white">Add Group</Button>
        ) : ''}
        <div id="groups-cards" className="d-flex flex-wrap" />
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
                        onClick={() => { changeGenreState(key); }}
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
                  <ListGroup id="skill-group" variant="flush">
                    {skill.map((level, key) => (
                      <ListGroup.Item
                        action
                        key={key}
                        className="active"
                        onClick={() => { changeSkillState(key); }}
                      >
                        {level}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </ListGroup.Item>
          <ListGroup.Item
            id="seeking-item"
            action
            className="active"
            onClick={() => { changeSeekingState(); }}
          >
            Seeking Band Member
          </ListGroup.Item>
        </ListGroup>
      </div>
    </Container>
  );
};

export default Groups;
