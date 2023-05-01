import React from 'react';
import { Card, Col, Container, Row, Badge, Button, Image } from 'react-bootstrap';
import { XLg, CheckLg, Youtube, CloudyFill, Instagram } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { People } from '../../api/people/People';
import LoadingSpinner from '../components/LoadingSpinner';

const Profile = () => {

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
    <Container id="profile" className="bg-white page-body p-5">
      <h1>Profile</h1>
      <Row>
        <Col xs={8}>
          <h3>Info</h3>
          <Card id="profile-card">
            <Card.Body className="d-flex">
              <div className="me-auto">
                <Card.Title>{info.name}</Card.Title>
                <Card.Text>{email}</Card.Text>
                <Card.Title><Badge bg="secondary">{info.instrument}</Badge></Card.Title>
                <Card.Text>
                  Preferred Genre: {info.genre} <br />
                  Skill Level: {info.skill}
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
              <div className="me-auto" />
              <Link to="/editprofile"><Button id="edit-profile-button" className="blue on-white">Edit</Button></Link>
            </Card.Footer>
          </Card>
        </Col>
        <Col xs={4}>
          <h3>Media</h3>
          <Card id="profile-media">
            <Card.Header className="p-3">
              { [info.youtube, info.soundcloud, info.instagram].map((link) => (
                (link !== undefined) ? (
                  <Card className="mb-3 on-white">
                    <Link to={link}>
                      <Card.Body>
                        { link === info.youtube ? (
                          <Card.Text>
                            <Youtube className="me-2" style={{ fontSize: '30px' }} />
                            <strong>  Youtube</strong>
                          </Card.Text>
                        ) : '' }
                        { link === info.soundcloud ? (
                          <Card.Text>
                            <CloudyFill className="me-2" style={{ fontSize: '30px' }} />
                            <strong>  SoundCloud</strong>
                          </Card.Text>
                        ) : '' }
                        { link === info.instagram ? (
                          <Card.Text>
                            <Instagram className="me-2" style={{ fontSize: '30px' }} />
                            <strong>  Instagram</strong>
                          </Card.Text>
                        ) : '' }
                      </Card.Body>
                    </Link>
                  </Card>
                ) : (
                  ''
                )
              ))}
            </Card.Header>
          </Card>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default Profile;
