import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import swal from 'sweetalert';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, BoolField, ErrorsField, LongTextField, SelectField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import { Groups } from '../../api/groups/Groups';
import LoadingSpinner from '../components/LoadingSpinner';

const bridge = new SimpleSchema2Bridge(Groups.schema);

/* Renders the EditGroup page for editing a single document. */
const EditGroup = ({ location }) => {
  const [redirectToReferer, setRedirectToRef] = useState(false);
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  // console.log('EditGroup', _id);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, ready } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Groups.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const document = Groups.collection.findOne(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);
  // console.log('EditGroup', doc, ready);
  // On successful submit, insert the data.
  const submit = (data, formRef) => {
    if (typeof (data.members) === 'string') {
      // eslint-disable-next-line no-param-reassign
      data.members = data.members.split(',');
    }
    const { name, image, genre, members, openToMembers } = data;
    Groups.collection.update(
      _id,
      { $set: { name, image, genre, members, openToMembers } },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Group updated successfully', 'success');
          formRef.reset();
          setRedirectToRef(true);
        }
      },
    );
  };

  let fRef = null;
  /* Redirect to groups page */
  const { from } = location?.state || { from: { pathname: '/groups' } };
  if (redirectToReferer) {
    return <Navigate to={from} />;
  }
  return ready ? (
    <Container id="edit-group" className="bg-white p-5">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col><h2>Edit Group</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} model={doc} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <TextField name="name" />
                <TextField name="image" help="Enter image URL" />
                <LongTextField name="members" help="Enter a list of your group members as 'Name: Instrument, Name: Instrument'. For example, 'John Foo: Guitar, James Bar: Piano'" />
                <Row>
                  <Col><SelectField name="genre" /></Col>
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
  ) : <LoadingSpinner />;
};

/* Ensure that the React Router location object is available in case we need to redirect. */
EditGroup.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.string,
  }),
};

EditGroup.defaultProps = {
  location: { state: '' },
};

export default EditGroup;
