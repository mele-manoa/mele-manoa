import React from 'react';
import { Card, Col, Container, Row, Badge, Button, Image } from 'react-bootstrap';
import { XLg, CheckLg } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { People } from '../../api/people/People';
import LoadingSpinner from '../components/LoadingSpinner';

const Profile = () => {
  const infoIsNullString = (thisInfo, placeholder) => {
    try {
      return (({ thisInfo }));
    } catch (err) {
      return ({ placeholder });
    }
  };

  const infoIsNullExtras = (thisInfo, type) => {
    try {
      if (thisInfo !== '' || null) {
        return (
          <Button href={thisInfo} className="on-white me-1" variant="secondary">
            {type}
          </Button>
        );
      }
      return '';
    } catch (err) {
      return '';
    }
  };

  const infoIsNullBool = (thisInfo) => {
    try {
      if (thisInfo === true) {
        return (<Badge bg="success" className="me-1"><CheckLg /></Badge>);
      }
      return (<Badge bg="warning" className="me-1"><XLg /></Badge>);
    } catch (err) {
      return (<Badge bg="warning" className="me-1"><XLg /></Badge>);
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
                <Card.Title>{() => { infoIsNullString(info.name, 'Name'); }}</Card.Title>
                <Card.Title><Badge bg="secondary">{() => { infoIsNullString(info.instrument, 'Instrument'); }}</Badge></Card.Title>
                <Card.Text>
                  Preferred Genre: { () => { infoIsNullString(info.genre, 'Genre'); } } <br />
                  Skill Level: { () => { infoIsNullString(info.skill, 'Beginner'); } }
                </Card.Text>
                <Card.Text>
                  { () => { infoIsNullBool(info.informalJam); } }
                  Open to Informal Jam <br />
                  { () => { infoIsNullBool(info.seekingBand); } }
                  Seeking a band
                </Card.Text>
              </div>
              <Image id="profile-image" className="float-right" src={() => { infoIsNullString(info.image, ''); }} thumbnail />
            </Card.Body>
            <Card.Footer className="d-flex">
              <div className="me-auto">
                { () => { infoIsNullExtras(info.youtube, 'Youtube'); } }
                { () => { infoIsNullExtras(info.soundcloud, 'SoundCloud'); } }
                { () => { infoIsNullExtras(info.instagram, 'Instagram'); } }
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
