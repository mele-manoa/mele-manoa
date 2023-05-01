import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { AutoForm, TextField, SelectField, SubmitField, BoolField, ErrorsField } from 'uniforms-bootstrap5';
import { Container, Col, Card, Row } from 'react-bootstrap';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { useTracker } from 'meteor/react-meteor-data';
import { People } from '../../api/people/People';
import LoadingSpinner from '../components/LoadingSpinner';

const schema = new SimpleSchema({
  name: String,
  image: String,
  instrument: {
    type: String,
    allowedValues: ['Guitar', 'Bass', 'Drums', 'Vocals', 'Piano', 'Strings', 'Winds', 'Percussion', 'Brass', 'Other'],
    defaultValue: 'Other',
  },
  genre: {
    type: String,
    allowedValues: ['Rock', 'Metal', 'Jazz', 'R&B', 'Reggae', 'Indie', 'Country', 'Pop', 'Latin', 'Classical', 'Electronic', 'Other'],
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

/* Renders the Register profile page for editing a single document. */
const RegisterProfile = ({ location }) => {
  const [redirectToReferer, setRedirectToRef] = useState(false);

  const { ready, email } = useTracker(() => {
    // Ensure that minimongo is populated with all collections prior to running render().
    const sub = Meteor.subscribe(People.userPublicationName);
    return {
      ready: sub.ready(),
      email: Meteor.user()?.username,
    };
  }, []);
  const submit = (data, formRef) => {
    const { _id, name, image, instrument, genre, skill, informalJam, seekingBand, youtube, soundcloud, instagram } = data;
    People.collection.update(_id, { $set: { name, image, instrument, genre, skill, informalJam, seekingBand, youtube, soundcloud, instagram } }, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        formRef.reset();
        setRedirectToRef(true);
      }
    });
  };
  let fRef = null;
  /* Redirect to profile page */
  const { from } = location?.state || { from: { pathname: '/profile' } };
  if (redirectToReferer) {
    return <Navigate to={from} />;
  }
  const info = People.collection.findOne({ email });
  return ready ? (
    <Container id="edit-profile" className="bg-white p-5">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col><h2>Register Profile</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} model={info} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <Row>
                  <Col><TextField name="name" /></Col>
                  <Col><SelectField name="instrument" /></Col>
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

/* Ensure that the React Router location object is available in case we need to redirect. */
RegisterProfile.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.string,
  }),
};

RegisterProfile.defaultProps = {
  location: { state: '' },
};

export default RegisterProfile;
