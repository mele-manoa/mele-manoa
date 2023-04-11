import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { Users } from '../../api/Users/Users';

const Profile = () => {
  const { ready, Users } = useTracker(() => {
    const subscription = Meteor.subscribe(Users.collection);

    const rdy = subscription.ready();
    const profileItems = Users.collection.find({}).fetch();
    return {

    }
};
}

export default Profile;