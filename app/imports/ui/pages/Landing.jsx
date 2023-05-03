import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Button, Col, Container, Row, Nav, Image, Stack } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

/* A simple static component to render some text for the landing page. */
const Landing = () => {
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);
  return (
    <Container fluid id="landing" className="px-0">
      <Container id="landing-center" className="d-flex align-items-center justify-content-center">
        <Row className="text-center">
          <Col className="d-flex flex-column justify-content-center">
            <h1 className="display-2"><strong>Welcome to</strong></h1>
            <Col className="align-middle text-center py-4">
              <Image src="/images/mele-manoa-logo.png" width="700px" />
            </Col>
          </Col>
          <Nav className="justify-content-end">
            {currentUser === '' ? (
              <Col className="d-grid gap-2 col-6 mx-auto">
                <Button className="btn btn-light btn-lg py-3" as={NavLink} to="/register">
                  <strong>Register</strong>
                </Button>
                <Button className="btn btn-light btn-lg py-3" as={NavLink} to="/signin">
                  <strong>Sign in</strong>
                </Button>
              </Col>
            ) : (
              <Col className="d-grid gap-2 col-6 mx-auto">
                <Button className="btn btn-light btn-lg py-3" as={NavLink} to="/discover">
                  <strong>Discover Other Musicians</strong>
                </Button>
                <Button className="btn btn-light btn-lg py-3" as={NavLink} to="/profile">
                  <strong>View Your Profile</strong>
                </Button>
              </Col>
            )}
          </Nav>
        </Row>
      </Container>
      <Container fluid id="landing-info" className="mt-5 .bg-gradient">
        <Container className="py-5">
          <h1>What is Mele Manoa?</h1>
          <Stack className="figure float-end ps-4">
            <Image src="/images/userguide/userGuide6.png" rounded thumbnail />
            <Image src="/images/userguide/userGuide7.png" rounded thumbnail />
            <Image src="/images/userguide/userGuide8.png" rounded thumbnail />
          </Stack>
          <p>
            Mele Manoa is a web application designed to bring musicians of UH together for jam sessions or performing
            bands. It is an easy way for them to find others with similar tastes and compatible musical abilities, by
            allowing students to create a profile indicating their musical tastes, their musical capabilities, and
            their musical goals. They can then find and connect with other musicians of similar interests using Mele
            Manoa and schedule informal jams or other kinds of meetups with new friends. Mele Manoa also allows
            musicians to discover other musical groups to join or to enjoy.
          </p>
          <p>
            Simply log in, create your profile, and look for other musicians to jam with!
          </p>
          <h3>User Guide</h3>
          <p>
            If this is your first time here,
            after registration you will also be prompted to fill in some information about yourself.
            This will allow other musicians of UH to find out about you and see who you are on Mele Manoa.
          </p>
          <p>
            All this information will also appear on your profile, which you can edit at any time. You can put in your
            name, what instrument you play, an image to represent you, what your preferred genre is, and your skill
            level. Since Mele Manoa wants to allow musicians to come together, There are also two options for you to
            check: if you are open to informal jams with other musicians, or if you are seeking a band to join. You are
            also able to add in external social media links to Youtube, SoundCloud, or Instagram to help others
            understand what kind of music you make. Just make sure the link starts with `https://`!
            <br /><br />
            Once you hit submit, you will find your profile all set and ready for you! If you wish to change your
            information, simply click the edit button once more and you can edit your information all you want.
          </p>
          <p>
            When you think your profile looks good, head over to the <b>Discover</b> page on the navigation bar. Here you
            will find all your fellow musicians who also use Mele Manoa. You can filter through them using the sidebar
            on the right, depending on what kind of musicians you’re looking for to jam with! The <b>Discover</b> page
            gives you all the information you need about them.
          </p>
          <p>
            Then the <b>Groups</b> page, this page is for musical groups that have already formed within UH.
            Like in the <b>Discover</b> page, you can also filter through the groups to find your favorites and perhaps one you may be interested in joining.
          </p>
          <p>
            For Admins, new buttons will show up on the <b>Groups</b> page to add new groups or edit existing groups.
            Similar to users, you can set the group’s name, image, members, genre, and if the group is open to new
            members or not. Members should be written in a comma-separated list to distinguish between each group
            member. Edit group is very similar, just press on a group’s edit button to edit their information.
          </p>
          <p>Thank you so much for using Mele Manoa!</p>
        </Container>
      </Container>
    </Container>
  );
};

export default Landing;
