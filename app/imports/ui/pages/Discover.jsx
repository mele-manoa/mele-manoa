import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Accordion, Container, ListGroup } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { People } from '../../api/people/People';
import UserCard from '../components/UserCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Discover = () => {
  const [filter, setFilter] = useState([]);
  const instruments = ['Guitar', 'Bass', 'Drums', 'Vocals', 'Piano', 'Strings', 'Winds', 'Percussion', 'Brass', 'Other'];
  const genres = ['Rock', 'Metal', 'Jazz', 'R&B', 'Reggae', 'Indie', 'Country', 'Pop', 'Latin', 'Classical', 'Electronic', 'Other'];
  const skills = ['Beginner', 'Intermediate', 'Expert', 'Professional'];
  const instrumentState = [];
  for (let i = 0; i < instruments.length; i++) {
    instrumentState[i] = true;
  }
  const genreState = [];
  for (let i = 0; i < genres.length; i++) {
    genreState[i] = true;
  }
  const skillState = [];
  for (let i = 0; i < skills.length; i++) {
    skillState[i] = true;
  }
  // const jamState = true;
  // const seekingState = true;

  const changeInstrumentState = async (instrument) => {
    const filterCopy = [...filter];
    if (!filterCopy.includes(instrument)) {
      filterCopy.push(instrument);
    } else {
      const filterCopyIndex = filterCopy.indexOf(instrument);
      if (filterCopyIndex > -1) {
        filterCopy.splice(filterCopyIndex, 1);
      }
    }
    setFilter(filterCopy);
  };

  const changeGenreState = (genre) => {
    const filterCopy = [...filter];
    if (!filterCopy.includes(genre)) {
      filterCopy.push(genre);
    } else {
      const filterCopyIndex = filterCopy.indexOf(genre);
      if (filterCopyIndex > -1) {
        filterCopy.splice(filterCopyIndex, 1);
      }
    }
    setFilter(filterCopy);
  };

  const changeSkillState = (skill) => {
    const filterCopy = [...filter];
    if (!filterCopy.includes(skill)) {
      filterCopy.push(skill);
    } else {
      const filterCopyIndex = filterCopy.indexOf(skill);
      if (filterCopyIndex > -1) {
        filterCopy.splice(filterCopyIndex, 1);
      }
    }
    setFilter(filterCopy);
  };

  const changeSeekingState = (state) => {
    const filterCopy = [...filter];
    if (!filterCopy.includes(state)) {
      filterCopy.push(state);
    } else {
      const filterCopyIndex = filterCopy.indexOf(state);
      if (filterCopyIndex > -1) {
        filterCopy.splice(filterCopyIndex, 1);
      }
    }
    setFilter(filterCopy);
  };

  const changeJamState = (state) => {
    const filterCopy = [...filter];
    if (!filterCopy.includes(state)) {
      filterCopy.push(state);
    } else {
      const filterCopyIndex = filterCopy.indexOf(state);
      if (filterCopyIndex > -1) {
        filterCopy.splice(filterCopyIndex, 1);
      }
    }
    setFilter(filterCopy);
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
      <div id="discover-main" className="me-auto">
        <h1>Discover</h1>
        <div id="discover-cards" className="d-flex flex-wrap">
          {filter.length ?
          // eslint-disable-next-line max-len
            people.filter(person => filter.includes(person.genre) || filter.includes(person.instrument) || filter.includes(person.skill) || (filter.includes('Seeking Band Member') && person.seekingBand) || (filter.includes('Looking for Informal Jam') && person.informalJam))
              .map(person => <UserCard key={person._id} info={person} />)
            :
            people.map((person) => <UserCard key={person._id} info={person} />)}
        </div>
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
                        className={filter.includes(instrument) ? 'active' : ''}
                        onClick={() => changeInstrumentState(instrument)}
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
                        className={filter.includes(genre) ? 'active' : ''}
                        onClick={() => { changeGenreState(genre); }}
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
                    {skills.map((level, key) => (
                      <ListGroup.Item
                        action
                        key={key}
                        className={filter.includes(level) ? 'active' : ''}
                        onClick={() => { changeSkillState(level); }}
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
            className={filter.includes('Looking for Informal Jam') ? 'active' : ''}
            onClick={() => { changeJamState('Looking for Informal Jam'); }}
          >
            Looking for Informal Jam
          </ListGroup.Item>
          <ListGroup.Item
            id="seeking-item"
            action
            className={filter.includes('Seeking Band Member') ? 'active' : ''}
            onClick={() => { changeSeekingState('Seeking Band Member'); }}
          >
            Seeking Band Member
          </ListGroup.Item>
        </ListGroup>
      </div>
    </Container>
  ) : <LoadingSpinner />);
};

export default Discover;
