import React from 'react';
import { Card, Col, Container, Row, Image } from 'react-bootstrap';

const Profile = () => {
  const info = {
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

  return (
    <Container id="profile" className="bg-white p-5">
      <Row>
        <Col>
          <h1>Your Profile</h1>
          <ul>
            <li>{info.name}</li>
            <li>{info.instrument}</li>
            <li>{info.genre}</li>
            <li>{info.skill}</li>
            <li>Open to Informal Jam</li>
            <li>Seeking a band</li>
          </ul>
        </Col>
        <Col>
          <Image id="profile-image" src={info.image} thumbnail />
        </Col>
      </Row>
      <Row>
        <h3>Groups Name is a part of</h3>
      </Row>
    </Container>
  )
};

export default Profile;
