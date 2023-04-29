import React from 'react';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import { AutoForm, ErrorsField, TextField, SubmitField, SelectField, BoolField } from 'uniforms-bootstrap5';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';

/* Renders the EditStuff page for editing a single document. */
const AddGroup = () => {
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
    <Container id="add-group" className="bg-white p-5">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col><h2>Edit Profile</h2></Col>
          <AutoForm schema={bridge} onSubmit={console.log('submit')}>
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
  );
};

export default AddGroup;
