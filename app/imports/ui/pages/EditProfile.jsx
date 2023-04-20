import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, HiddenField, TextField, SubmitField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { People } from '../../api/people/People';

const formSchema = new SimpleSchema({
  email: String,
  name: String,
  image: String,
  instrument: {
    type: String,
    allowedValues: String,
    defaultValue: 0,
  },
  genre: {
    type: String,
    allowedValues: String,
    defaultValue: 0,
  },
  skill: {
    type: String,
    allowedValues: String,
    defaultValue: 0,
  },
  informalJam: Boolean,
  seekingBand: Boolean,
  youtube: String,
  soundcloud: String,
  instagram: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the EditStuff page for editing a single document. */
const EditProfile = () => {
  const submit = (data) => {
    const { email, name, image, instrument, genre, skill, informalJam, seekingband, youtube, soundcloud, instagram } = data;
    People.collection.insert(
      { email, name, image, instrument, genre, skill, informalJam, seekingband, youtube, soundcloud, instagram },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success');
        }
      },
    );
  };

  const fRef = null;
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center"><h2>Edit Profile</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <Row>
                  <Col><TextField name="Name" /></Col>
                </Row>
                <Row>
                  <Col><TextField name="email" /></Col>
                </Row>
                <Row>
                  <Col><TextField name="instrument" /></Col>
                </Row>
                <Row>
                  <Col><TextField name="image" /></Col>
                </Row>
                <Row>
                  <Col><TextField name="genre" /></Col>
                </Row>
                <Row>
                  <Col><TextField name="skill" /></Col>
                </Row>
                <SubmitField value="Submit" />
                <ErrorsField />
                <HiddenField name="owner" />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default EditProfile;
