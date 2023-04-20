import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Accordion, Container, ListGroup, Row, Col } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { People } from '../../api/people/People';
import UserCard from '../components/UserCard';
import LoadingSpinner from '../components/LoadingSpinner';

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

  const testUser = {
    name: 'Kass',
    image: 'https://cdn.wikimg.net/en/zeldawiki/images/thumb/5/57/BotW_Kass_Artwork.png/474px-BotW_Kass_Artwork.png',
    instrument: 'Accordion',
    genre: 'Folk',
    skill: 'Professional',
    informalJam: true,
    seekingBand: true,
    youtube: 'https://www.youtube.com/watch?v=nq6jS2-XDeA&pp=ygUMa2FzcydzIHRoZW1l',
    soundcloud: 'https://soundcloud.com/gamechops/kass-theme',
    instagram: '/',
    _id: '5',
  };


  const { ready, people } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(People.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const peopleInfo = People.collection.find({}).fetch();
    return {
      people: peopleInfo,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container id="discover" className="d-flex bg-white p-5">
      <Row id="discover-content">
        <Col id="discover-main" xs={8}>
          <h1>Discover</h1>
          <div id="discover-cards" className="d-flex">
            {people.map((person) => <UserCard key={person._id} info={person} />)}
          </div>
        </Col>
        <Col xs={4}>
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
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default Discover;
