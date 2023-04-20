import { Meteor } from 'meteor/meteor';
import { People } from '../../api/people/People.js';

/* eslint-disable no-console */

// Initialize the database with a default data document.
const addData = (data) => {
  console.log(`  Adding: ${data.name} (${data.email})`);
  People.collection.insert(data);
};

// Initialize the PeopleCollection if empty.
if (People.collection.find().count() === 0) {
  if (Meteor.settings.defaultPeople) {
    console.log('Creating default data.');
    Meteor.settings.defaultPeople.forEach(data => addData(data));
  }
}
