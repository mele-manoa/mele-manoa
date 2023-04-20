import { Meteor } from 'meteor/meteor';
import { Accounts } from '../../api/account/Accounts.js';

/* eslint-disable no-console */

// Initialize the database with a default data document.
const addData = (data) => {
  console.log(`  Adding: ${data.name} (${data.email})`);
  Accounts.collection.insert(data);
};

// Initialize the StuffsCollection if empty.
if (Accounts.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.forEach(data => addData(data));
  }
}
