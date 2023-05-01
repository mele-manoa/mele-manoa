import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Navigate } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, TextField } from 'uniforms-bootstrap5';

/**
 * SignUp component is similar to signin component, but we create a new user instead.
 */
const Register = () => {
  const [error, setError] = useState('');
  const [redirectToReferer, setRedirectToRef] = useState(false);

  const schema = new SimpleSchema({
    email: String,
    password: String,
  });
  const bridge = new SimpleSchema2Bridge(schema);

  /* Handle SignUp submission. Create user account and a profile entry, then redirect to the home page. */
  const submit = (doc) => {
    const { email, password } = doc;
    Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        setError('');
        setRedirectToRef(true);
      }
    });
  };

  /* Display the signup form. Redirect to edit profile page after successful registration and login. */
  // if correct authentication, redirect to from: page instead of signup screen
  if (redirectToReferer) {
    return (<Navigate to="/registerprofile" />);
  }
  return (
    <Container fluid id="register-page" className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center py-4">
            <h2>Register your account</h2>
          </Col>
          <Card>
            <Card.Body>
              <AutoForm schema={bridge} onSubmit={data => submit(data)}>
                <TextField id="register-form-email" name="email" placeholder="E-mail address" />
                <TextField id="register-form-password" name="password" placeholder="Password" type="password" />
                <ErrorsField />
                <input id="register-form-submit" className="btn btn-light on-white" type="submit" value="Register" />
              </AutoForm>
              <Alert variant="light" className="mt-3">
                <Link to="/signin">Already have an account? Sign in here!</Link>
              </Alert>
              {error === '' ? (
                ''
              ) : (
                <Alert variant="danger">
                  <Alert.Heading>Registration was not successful</Alert.Heading>
                  {error}
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

/* Ensure that the React Router location object is available in case we need to redirect. */
Register.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.string,
  }),
};

Register.defaultProps = {
  location: { state: '' },
};

export default Register;
