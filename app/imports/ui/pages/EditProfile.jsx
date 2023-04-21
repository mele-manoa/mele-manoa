import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, TextField, SubmitField, SelectField, BoolField } from 'uniforms-bootstrap5';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';

/* Renders the EditStuff page for editing a single document. */
const EditProfile = () => {
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
  return (
    <Container id="edit-profile" className="bg-white p-5">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center"><h2>Edit Profile</h2></Col>
          <AutoForm schema={bridge} onSubmit={console.log('submit')}>
            <Card>
              <Card.Body>
                <Row>
                  <Col><TextField name="name" showInlineError placeholder="name" /></Col>
                </Row>
                <Row>
                  <Col><TextField name="instrument" /></Col>
                  <Col><TextField name="image" showInlineError placeholder="profile image URL" /></Col>
                </Row>
                <Row>
                  <Col><SelectField name="genre" /></Col>
                  <Col><SelectField name="skill" /></Col>
                </Row>
                <Row>
                  <Col><BoolField name="informalJam" appearance="checkbox" /></Col>
                  <Col><BoolField name="seekingBand" appearance="checkbox" /></Col>
                </Row>
                <Row>
                  <Col><TextField name="youtube" /></Col>
                  <Col><TextField name="soundcloud" /></Col>
                  <Col><TextField name="instagram" /></Col>
                </Row>
                <SubmitField value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default EditProfile;
