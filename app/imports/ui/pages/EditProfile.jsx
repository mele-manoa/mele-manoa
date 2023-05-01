import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { AutoForm, TextField, SelectField, BoolField, ErrorsField } from 'uniforms-bootstrap5';
import { Container, Col, Card, Row, Button } from 'react-bootstrap';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useTracker } from 'meteor/react-meteor-data';
import { People } from '../../api/people/People';
import LoadingSpinner from '../components/LoadingSpinner';

const bridge = new SimpleSchema2Bridge(People.schema);

/* Renders the EditStuff page for editing a single document. */
const EditProfile = ({ location }) => {
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
        swal('Success', 'Profile updated successfully', 'success');
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
    <Container id="edit-profile" className="bg-white page-body p-5">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col><h2>Edit Profile</h2></Col>
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
                  <Col><TextField name="youtube" help="Enter URL starting with 'https://'" /></Col>
                  <Col><TextField name="soundcloud" /></Col>
                  <Col><TextField name="instagram" /></Col>
                </Row>
                <Row>
                  <Col className="d-flex">
                    <input id="add-group-submit" className="btn btn-light on-white" type="submit" value="Submit" />
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

/* Ensure that the React Router location object is available in case we need to redirect. */
EditProfile.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.string,
  }),
};

EditProfile.defaultProps = {
  location: { state: '' },
};

export default EditProfile;
