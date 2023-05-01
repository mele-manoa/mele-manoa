import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Accordion, Container, ListGroup } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { People } from '../../api/people/People';
import UserCard from '../components/UserCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Discover = () => {
  const [filter, setFilter] = useState([]);
  const instruments = People.schema._schema.instrument.type.definitions[0].allowedValues;
  const genres = People.schema._schema.genre.type.definitions[0].allowedValues;
  const skills = People.schema._schema.skill.type.definitions[0].allowedValues;

  const changeState = async (item) => {
    const filterCopy = [...filter];
    if (!filterCopy.includes(item)) {
      filterCopy.push(item);
    } else {
      const filterCopyIndex = filterCopy.indexOf(item);
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
    <Container id="discover" className="d-flex bg-white page-body p-5">
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
                        onClick={() => changeState(instrument)}
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
                        onClick={() => { changeState(genre); }}
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
                        onClick={() => { changeState(level); }}
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
            onClick={() => { changeState('Looking for Informal Jam'); }}
          >
            Looking for Informal Jam
          </ListGroup.Item>
          <ListGroup.Item
            id="seeking-item"
            action
            className={filter.includes('Seeking Band Member') ? 'active' : ''}
            onClick={() => { changeState('Seeking Band Member'); }}
          >
            Seeking Band Member
          </ListGroup.Item>
        </ListGroup>
      </div>
    </Container>
  ) : <LoadingSpinner />);
};

export default Discover;
