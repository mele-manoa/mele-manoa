import React from 'react';
import { Card, Container, Row, Col, Image, Badge, Button } from 'react-bootstrap';
import { CheckLg, XLg } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import UserCard from '../components/UserCard';

const Profile = () => {
  const info = {
    name: 'Kass',
    image: 'https://cdn.wikimg.net/en/zeldawiki/images/thumb/5/57/BotW_Kass_Artwork.png/474px-BotW_Kass_Artwork.png',
    instrument: 'Accordion',
    genre: 'Folk',
    skill: 'Professional',
    informalJam: true,
    seekingBand: false,
    youtube: 'https://www.youtube.com/watch?v=nq6jS2-XDeA&pp=ygUMa2FzcydzIHRoZW1l',
    soundcloud: 'https://soundcloud.com/gamechops/kass-theme',
    instagram: '/',
    _id: '5',
  };

  return (
    <Container id="profile" className="bg-white p-5">
      <h1>Profile</h1>
      <Row>
        <Col xs={8}>
          <h3>Info</h3>
          <Card id="profile-card">
            <Card.Body className="d-flex">
              <div className="me-auto">
                <Card.Title>{info.name}</Card.Title>
                <Card.Title><Badge bg="secondary">{info.instrument}</Badge></Card.Title>
                <Card.Text>
                  Preferred Genre: {info.genre} <br />
                  Skill Level: {info.skill}
                </Card.Text>
                <Card.Text>
                  { info.informalJam === true ? (
                    <Badge bg="success" className="me-1"><CheckLg /></Badge>
                  ) : (
                    <Badge bg="warning" className="me-1"><XLg /></Badge>
                  )}
                  Open to Informal Jam <br />
                  { info.seekingBand === true ? (
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
                { [info.youtube, info.soundcloud, info.instagram].map((link) => (
                  link !== '' || null ? (
                    <Button href={link} className="on-white me-1" variant="secondary">
                      { link === info.youtube ? 'Youtube' : '' }
                      { link === info.soundcloud ? 'SoundCloud' : '' }
                      { link === info.instagram ? 'Instagram' : '' }
                    </Button>
                  ) : ''
                ))}
              </div>
              <Link to="/edit"><Button className="blue on-white">Edit</Button></Link>
            </Card.Footer>
          </Card>
        </Col>
        <Col xs={4}>
          <h3>Groups</h3>
          <Card id="profile-groups">
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
