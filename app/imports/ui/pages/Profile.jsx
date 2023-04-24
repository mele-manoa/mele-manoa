import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, TextField, SelectField, SubmitField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { useTracker } from 'meteor/react-meteor-data';
import { Users } from '../../api/Users/Users';
import { updateProfileMethod } from '../../startup/both/Methods';
import LoadingSpinner from '../components/LoadingSpinner';
import { ComponentIDs } from '../utilities/ids';

/* Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = (allInstruments, allGenres, skillLevel) => new SimpleSchema({
  name: { type: String, label: 'Name', optional: true },
  instrument: { type: Array, label: 'Instrument(s)', optional: true },
  'instrument.$': { type: String, allowedValues: allInstruments },
  projects: { type: Array, label: 'Genre(s)', optional: true },
  'genres.$': { type: String, allowedValues: allGenres },
  skill: { type: Array, label: 'Skill Level', optional: true },
  'skill.$': { type: String, allowedValues: skillLevel },
  InformalJam: { type: Boolean, optional: true },
  BandSeeking: { type: Boolean, optional: true },
});

const Profile = () => {

  /* On submit, insert the data. */
  const submit = (data) => {
    Meteor.call(updateProfileMethod, data, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Profile updated successfully', 'success');
      }
    });
  };

  const { ready, email } = useTracker(() => {
    // Ensure that minimongo is populated with all collections prior to running render().
    const sub1 = Meteor.subscribe(Users.userPublicationName);
    return {
      ready: sub1.ready(),
      email: Meteor.user()?.username,
    };
  }, []);
  // Create the form schema for uniforms. Need to determine all instruments and genres for muliselect list.
  const allInstruments = _.pluck(Users.collection.find().fetch(), 'instrument');
  const allGenres = _.pluck(Users.collection.find().fetch(), 'genre');
  const skillLevel = _.pluck(Users.collection.find().fetch(), 'skill');
  const formSchema = makeSchema(allInstruments, allGenres, skillLevel);
  const bridge = new SimpleSchema2Bridge(formSchema);
  // Now create the model with all the user information.
  const instruments = _.pluck(Users.collection.find({ profile: email }).fetch(), 'instruments');
  const genres = _.pluck(Users.collection.find({ profile: email }).fetch(), 'genres');
  const skill = _.pluck(Users.collection.find({ profile: email }).fetch(), 'skill');
  const profile = Users.collection.findOne({ email });
  const model = _.extend({}, profile, { instruments, genres, skill });
  return ready ? (
    <Container id="profile" className="d-flex bg-white p-6">
      <Col className="justify-content-center">
        <Col className="text-center py-4"><h2>Your Profile</h2></Col>
        <AutoForm model={model} schema={bridge} onSubmit={data => submit(data)}>
          <Card>
            <Card.Body>
              <Row>
                <Col xs={4}><TextField id={ComponentIDs.homeFormFirstName} name="name" showInlineError placeholder="Name" /></Col>
              </Row>
              <Row>
                <Col xs={6}><SelectField name="instruments" showInlineError multiple /></Col>
                <Col xs={6}><SelectField name="genres" showInlineError multiple /></Col>
              </Row>
              <Row>
                <Col xs={6}><SelectField name="skill" showInlineError multiple /></Col>
                <Col xs={6}><SelectField name="InformalJam" showInlineError multiple /></Col>
                <Col xs={6}><SelectField name="BandSeeking" showInlineError multiple /></Col>
              </Row>
              <SubmitField id={ComponentIDs.homeFormSubmit} value="Update" />
            </Card.Body>
          </Card>
        </AutoForm>
      </Col>
    </Container>
  ) : <LoadingSpinner />;

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
  );
};

export default Profile;
