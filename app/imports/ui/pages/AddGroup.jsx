import React from 'react';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import { AutoForm, ErrorsField, TextField, SubmitField, SelectField, BoolField, LongTextField } from 'uniforms-bootstrap5';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import swal from 'sweetalert';
import { Groups } from '../../api/groups/Groups';

const schema = new SimpleSchema({
  name: String,
  image: String,
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
  members: [String],
  openToMembers: {
    type: Boolean,
    allowedValues: [true, false],
    defaultValue: false,
  },
});
const bridge = new SimpleSchema2Bridge(schema);

function processMembers(membersList) {
  
}

/* Renders the AddGroup page for editing a single document. */
const AddGroup = () => {
  const submit = (data, formRef) => {
    // eslint-disable-next-line no-param-reassign
    data.members = processMembers(data.members);
    const { name, image, genre, skill, members, openToMembers } = data;
    Groups.collection.insert(
      { name, image, genre, skill, members, openToMembers },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Group added successfully', 'success');
          formRef.reset();
        }
      },
    );
  };

  let fRef = null;
  return (
    <Container id="add-group" className="bg-white p-5">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col><h2>Add Group</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <TextField name="name" />
                <TextField name="image" help="Enter image URL" />
                <LongTextField name="members" />
                <Row>
                  <Col><SelectField name="genre" /></Col>
                  <Col><SelectField name="skill" /></Col>
                </Row>
                <BoolField name="openToMembers" appearance="checkbox" />
                <Row>
                  <Col className="d-flex">
                    <SubmitField value="Submit" />
                    <Button href="/groups" className="blue on-white ms-3">Cancel</Button>
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
