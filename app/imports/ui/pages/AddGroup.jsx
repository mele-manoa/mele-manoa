import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import { AutoForm, ErrorsField, TextField, SelectField, BoolField, LongTextField } from 'uniforms-bootstrap5';
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

/* Renders the AddGroup page for editing a single document. */
const AddGroup = ({ location }) => {
  const [redirectToReferer, setRedirectToRef] = useState(false);

  const submit = (data, formRef) => {
    // eslint-disable-next-line no-param-reassign
    data.members = data.members.split(',');
    const { name, image, genre, skill, members, openToMembers } = data;
    Groups.collection.insert(
      { name, image, genre, skill, members, openToMembers },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Group added successfully', 'success');
          formRef.reset();
          setRedirectToRef(true);
        }
      },
    );
  };

  let fRef = null;
  /* Redirect to groups page after successful registration and login. */
  const { from } = location?.state || { from: { pathname: '/groups' } };
  if (redirectToReferer) {
    return <Navigate to={from} />;
  }
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
                <LongTextField name="members" help="Enter a list of your group members as 'Name: Instrument, Name: Instrument'. For example, 'John Foo: Guitar, James Bar: Piano'" />
                <Row>
                  <Col><SelectField name="genre" /></Col>
                  <Col><SelectField name="skill" /></Col>
                </Row>
                <BoolField name="openToMembers" appearance="checkbox" />
                <Row>
                  <Col className="d-flex">
                    <input id="add-group-submit" className="btn btn-light on-white" type="submit" value="Submit" />
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

/* Ensure that the React Router location object is available in case we need to redirect. */
AddGroup.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.string,
  }),
};

AddGroup.defaultProps = {
  location: { state: '' },
};

export default AddGroup;
