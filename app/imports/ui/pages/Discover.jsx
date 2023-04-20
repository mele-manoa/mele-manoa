import React from 'react';
import { Accordion, Container, ListGroup } from 'react-bootstrap';
// import UserCard from '../components/UserCard';
//filter function
const Discover = () => {
  const instruments = ['Guitar', 'Bass', 'Drums', 'Vocals', 'Piano', 'Strings', 'Winds', 'Percussion', 'Brass', 'Other'];
  const genres = ['Rock', 'Jazz', 'EDM', 'Dubstep', 'Country', 'Pop', 'Classical', 'Rhythm And Blues'];
  const skill = ['Beginner', 'Intermediate', 'Expert', 'Professional'];


  const instrumentState = [];
  for (let i = 0; i < instruments.length; i++) {
    instrumentState[i] = true;
  }
  const genreState = [];
  for (let i = 0; i < genres.length; i++) {
    genreState[i] = true;
  }
  const skillState = [];
  for (let i = 0; i < skill.length; i++) {
    skillState[i] = true;
  }
  let jamState = true;
  let seekingState = true;

  const changeInstrumentState = (key) => {
    const child = document.getElementById('instrument-group').children.item(key);
    if (instrumentState[key] === false) {
      child.classList.add('active');
    } else {
      child.classList.remove('active');
    }
    instrumentState[key] = !instrumentState[key];
  };

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

  const changeJamState = () => {
    const jam = document.getElementById('jam-item');
    if (jamState === false) {
      jam.classList.add('active');
    } else {
      jam.classList.remove('active');
    }
    jamState = !jamState;
  };

  return (
    <Container id="discover" className="d-flex bg-white p-5">
      <div id="discover-main" className="me-auto">
        <h1>Discover</h1>
        <div id="discover-cards" className="d-flex" />
      </div>
      <div id="discover-sidebar" className="p-3">
        <h4>Filter By</h4>
        <ListGroup>
          <ListGroup.Item className="p-0">
            <Accordion defaultActiveKey="0" flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Instruments</Accordion.Header>
                <Accordion.Body className="p-0">
                  <ListGroup id="instrument-group" variant="flush">
                    {instruments.map((instrument, key) => (
                      <ListGroup.Item
                        action
                        key={key}
                        className="active"
                        onClick={() => { changeInstrumentState(key); }}
                      >
                        {instrument}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
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
              <Accordion.Item eventKey="2">
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
            id="jam-item"
            action
            className="active"
            onClick={() => { changeJamState(); }}
          >
            Looking for Informal Jam
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

export default Discover;
