import { Meteor } from 'meteor/meteor';
import { Users } from '../../api/user/Users.js';

/* eslint-disable no-console */

// Initialize the database with a default data document.
const addData = (data) => {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Users.collection.insert(data);
};

// Initialize the StuffsCollection if empty.
if (Users.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.forEach(data => addData(data));
  }
}
