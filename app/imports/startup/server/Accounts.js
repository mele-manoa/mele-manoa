import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

/* eslint-disable no-console */

const createUser = (email, password, role) => {
  console.log(`  Creating user ${email}.`);
  const userID = Accounts.createUser({
    username: email,
    email: email,
    password: password,
    name: String,
    instrument: ['guitar', 'bass', 'drums', 'vocals', 'piano', 'strings', 'winds', 'percussion', 'brass', 'other'],
    genre: ['rock', 'jazz', 'EDM', 'dubstep', 'country', 'pop', 'classical', 'rhythm and blues'],
    skill: ['beginner', 'intermediate', 'expert', 'professional'],
    InformalJam: Boolean,
    BandSeeking: Boolean,
    Image: String,
  });
  if (role === 'admin') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'admin');
  }
};

// When running app for first time, pass a settings file to set up a default user account.
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    Meteor.settings.defaultAccounts.forEach(({ email, password, role }) => createUser(email, password, role));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
