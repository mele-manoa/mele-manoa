import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Container, Accordion, ListGroup, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import GroupCard from '../components/GroupCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { Groups } from '../../api/groups/Groups';

const GroupsPage = () => {
  const [filter, setFilter] = useState([]);
  const genres = Groups.schema._schema.genre.type.definitions[0].allowedValues;

  const changeState = (item) => {
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

  const { ready, groups } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Groups.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const groupInfo = Groups.collection.find({}).fetch();
    return {
      groups: groupInfo,
      ready: rdy,
    };
  }, []);

  return (ready ? (
    <Container id="groups" className="d-flex bg-white p-5">
      <div id="groups-main" className="me-auto">
        <h1>
          Groups
          {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
            <Button id="add-group-button" href="/addgroup" className="on-white ms-4">Add Group</Button>
          ) : ''}
        </h1>
        <div id="groups-cards" className="d-flex flex-wrap">
          {
            filter.length ? groups.filter(group => filter.includes(group.genre)
              || (filter.includes('Seeking Band Member') && group.openToMembers)).map((group) => <GroupCard key={group._id} info={group} />) :
              groups.map((group) => <GroupCard key={group._id} info={group} />)
          }
        </div>
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
                        className={filter.includes(genre) ? 'active' : ''}
                        onClick={() => { changeState(genre); }}
                      >
                        {genre}
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
            className={filter.includes('Seeking Band Member') ? 'active' : ''}
            onClick={() => { changeState('Seeking Band Member'); }}
          >
            Seeking Band Members
          </ListGroup.Item>
        </ListGroup>
      </div>
    </Container>
  ) : <LoadingSpinner />);
};

export default GroupsPage;
