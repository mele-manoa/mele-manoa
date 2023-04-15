import React from 'react';
import { Container } from 'react-bootstrap';
import UserCard from '../components/UserCard';

const Discover = () => {
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

  return (
    <Container id="discover" className="d-flex bg-white p-5">
      <div id="discover-main" className="p-3 me-auto">
        <h1>Discover</h1>
        <div id="discover-cards">
          <p>
            All the musicians go here
          </p>
          <UserCard info={testUser} />
        </div>
      </div>
      <div id="discover-sidebar" className="p-3">
        <p>Filter By</p>
        <ul>
          <li>Instruments</li>
          <ul>
            <li>Guitar</li>
            <li>Bass</li>
            <li>Drums</li>
            <li>Vocals</li>
            <li>Keyboard/Piano</li>
            <li>Strings</li>
            <li>Winds</li>
            <li>Percussion</li>
            <li>Brass</li>
          </ul>
          <li>Genre</li>
          <li>Skill Level</li>
          <ul>
            <li>Beginner</li>
            <li>Intermediate</li>
            <li>Expert</li>
            <li>Professional</li>
          </ul>
          <li>Informal Jam?</li>
          <li>Seeking Band Member?</li>
        </ul>
      </div>
    </Container>
  );
};

export default Discover;
