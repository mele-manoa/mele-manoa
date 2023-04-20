import React from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, HiddenField, TextField, SubmitField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';
import { People } from '../../api/people/People';

const bridge = new SimpleSchema2Bridge(People.schema);

/* Renders the EditStuff page for editing a single document. */
const EditProfile = () => {
  const { _id } = useParams();
  const { doc, ready } = useTracker(() => {
    const subscription = Meteor.subscribe(People.userPublicationName);
    const rdy = subscription.ready();
    const document = People.collection.findOne(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);
  // console.log('EditProfile', doc, ready);
  // On successful submit, insert the data.
  const submit = (data) => {
    const { email, name, image, instrument, genre, skill } = data;
    People.collection.update(_id, { $set: { email, name, image, instrument, genre, skill } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item updated successfully', 'success')));
  };

  return ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center"><h2>Edit Profile</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
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
  ) : <LoadingSpinner />;
};

export default EditProfile;
