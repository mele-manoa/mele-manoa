import { Meteor } from 'meteor/meteor';
import { People } from '../../api/people/People.js';
import { Groups } from '../../api/groups/Groups';

/* eslint-disable no-console */

// Initialize the database with a default data document.
const addData = (data) => {
  console.log(`  Adding: ${data.name} (${data.email})`);
  People.collection.insert(data);
};

const addData2 = (data) => {
  console.log(`  Adding: ${data.name} (${data.email})`);
  Groups.collection.insert(data);
};

// Initialize the PeopleCollection if empty.
if (People.collection.find().count() === 0) {
  if (Meteor.settings.defaultPeople) {
    console.log('Creating default data.');
    Meteor.settings.defaultPeople.forEach(data => addData(data));
  }
}

if (Groups.collection.find().count() === 0) {
  if (Meteor.settings.defaultGroups) {
    console.log('Creating default data.');
    Meteor.settings.defaultGroups.forEach(data => addData2(data));
  }
}
