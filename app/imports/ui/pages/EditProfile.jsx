import React from 'react';
import { Meteor } from 'meteor/meteor';
import { AutoForm, TextField, SelectField, SubmitField, BoolField, ErrorsField } from 'uniforms-bootstrap5';
import { Container, Col, Card, Row, Button } from 'react-bootstrap';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { useTracker } from 'meteor/react-meteor-data';
import { People } from '../../api/people/People';
import LoadingSpinner from '../components/LoadingSpinner';

const schema = new SimpleSchema({
  name: String,
  image: String,
  instrument: String,
  genre: {
    type: String,
    allowedValues: ['Rock', 'Jazz', 'EDM', 'Dubstep', 'Country', 'Pop', 'Classical', 'RhythmAndBlues'],
    defaultValue: 'Rock',
  },
  skill: {
    type: String,
    allowedValues: ['Beginner', 'Intermediate', 'Expert', 'Professional'],
    defaultValue: 'Beginner',
  },
  informalJam: {
    type: Boolean,
    allowedValues: [true, false],
    defaultValue: false,
  },
  seekingBand: {
    type: Boolean,
    allowedValues: [true, false],
    defaultValue: false,
  },
  youtube: { type: String, optional: true },
  soundcloud: { type: String, optional: true },
  instagram: { type: String, optional: true },
});

const bridge = new SimpleSchema2Bridge(schema);

/* Renders the EditStuff page for editing a single document. */
const EditProfile = () => {

  const { ready, email } = useTracker(() => {
    // Ensure that minimongo is populated with all collections prior to running render().
    const sub = Meteor.subscribe(People.userPublicationName);
    return {
      ready: sub.ready(),
      email: Meteor.user()?.username,
    };
  }, []);
  const submit = (data) => {
    const { name, image, instrument, genre, skill, informalJam, seekingBand, youtube, soundcloud, instagram } = data;
    People.collection.update({ email }, { $set: { name, image, instrument, genre, skill, informalJam, seekingBand, youtube, soundcloud, instagram } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item updated successfully', 'success')));
  };
  const info = People.collection.findOne({ email });
  return ready ? (
    <Container id="edit-profile" className="bg-white p-5">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col><h2>Edit Profile</h2></Col>
          <AutoForm model={info} schema={bridge} onSubmit={data => submit(data)}>
            <Card>
              <Card.Body>
                <Row>
                  <Col><TextField name="name" /></Col>
                  <Col><TextField name="instrument" /></Col>
                </Row>
                <Row>
                  <Col><TextField name="image" help="Enter image URL" /></Col>
                </Row>
                <Row>
                  <Col><SelectField name="genre" /></Col>
                  <Col><SelectField name="skill" /></Col>
                </Row>
                <Row>
                  <Col className="d-flex">
                    <BoolField name="informalJam" appearance="checkbox" />
                    <BoolField name="seekingBand" appearance="checkbox" className="ms-3" />
                  </Col>
                </Row>
                <Row>
                  <Col><TextField name="youtube" /></Col>
                  <Col><TextField name="soundcloud" /></Col>
                  <Col><TextField name="instagram" /></Col>
                </Row>
                <Row>
                  <Col className="d-flex">
                    <SubmitField value="Submit" />
                    <Button href="/profile" className="blue on-white ms-3">Cancel</Button>
                  </Col>
                </Row>
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default EditProfile;
