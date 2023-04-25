import React from 'react';
import { Card, Col, Container, Row, Badge, Button, Image } from 'react-bootstrap';
import { XLg, CheckLg } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { People } from '../../api/people/People';
import LoadingSpinner from '../components/LoadingSpinner';

const Profile = () => {
  const infoIsNullString = (thisInfo) => {
    try {
      return (<p>{thisInfo}</p>);
    } catch (err) {
      return (<p>Name</p>);
  };

  const infoIsNullBool = (thisInfo) => {
    try {
      return thisInfo;
    } catch (err) {
      return false;
    }
  };

  const { ready, email } = useTracker(() => {
    // Ensure that minimongo is populated with all collections prior to running render().
    const sub = Meteor.subscribe(People.userPublicationName);
    return {
      ready: sub.ready(),
      email: Meteor.user()?.username,
    };
  }, []);
  const info = People.collection.findOne({ email });
  return ready ? (
    <Container id="profile" className="bg-white p-5">
      <h1>Profile</h1>
      <Row>
        <Col xs={8}>
          <h3>Info</h3>
          <Card id="profile-card">
            <Card.Body className="d-flex">
              <div className="me-auto">
                {
                  () => { infoIsNullString(info.name); }
                }
                <Card.Title><Badge bg="secondary">{() => { infoIsNullString(info.instrument); }}</Badge></Card.Title>
                <Card.Text>
                  Preferred Genre: { () => { infoIsNullString(info.genre); } } <br />
                  Skill Level: { () => { infoIsNullString(info.skill); } }
                </Card.Text>
                <Card.Text>
                  {info.informalJam === true ? (
                    <Badge bg="success" className="me-1"><CheckLg /></Badge>
                  ) : (
                    <Badge bg="warning" className="me-1"><XLg /></Badge>
                  )}
                  Open to Informal Jam <br />
                  {info.seekingBand === true ? (
                    <Badge bg="success" className="me-1"><CheckLg /></Badge>
                  ) : (
                    <Badge bg="danger" className="me-1"><XLg /></Badge>
                  )}
                  Seeking a band
                </Card.Text>
              </div>
              <Image id="profile-image" className="float-right" src={info.image} thumbnail />
            </Card.Body>
            <Card.Footer className="d-flex">
              <div className="me-auto">
                {[info.youtube].map((link) => (
                  link !== '' || null ? (
                    <Button href={link} className="on-white me-1" variant="secondary">
                      {link === info.youtube ? 'Youtube' : ''}
                    </Button>
                  ) : ''
                ))}
                {[info.soundcloud].map((link) => (
                  link !== '' || null ? (
                    <Button href={link} className="on-white me-1" variant="secondary">
                      {link === info.soundcloud ? 'SoundCloud' : ''}
                    </Button>
                  ) : ''
                ))}
                {[info.instagram].map((link) => (
                  link !== '' || null ? (
                    <Button href={link} className="on-white me-1" variant="secondary">
                      {link === info.instagram ? 'Instagram' : ''}
                    </Button>
                  ) : ''
                ))}
              </div>
              <Link to="/editprofile"><Button className="blue on-white">Edit</Button></Link>
            </Card.Footer>
          </Card>
        </Col>
        <Col xs={4}>
          <h3>Groups</h3>
          <Card id="profile-groups" />
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default Profile;
