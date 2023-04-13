import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Users } from '../../api/user/Users';
import LoadingSpinner from '../components/LoadingSpinner';

const Profile = () => {
// useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, user } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Users.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const userInfo = Users.collection.find({}).fetch();
    return {
      user: userInfo,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container id="profile" className="d-flex bg-white p-6">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center py-4">
            <h2>Profile</h2>
          </Col>
          <Card>
            <Card.Body>
              <h1>{user.name}</h1>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default Profile;
