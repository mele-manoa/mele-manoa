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
    Name: String,
    Image: String,
    Instrument: ['Guitar', 'Bass', 'Drums', 'Vocals', 'Piano', 'Strings', 'Winds', 'Percussion', 'Brass', 'Other'],
    Genre: ['Rock', 'Jazz', 'EDM', 'Dubstep', 'Country', 'Pop', 'Classical', 'RhythmAndBlues'],
    Skill: ['Beginner', 'Intermediate', 'Expert', 'Professional'],
    InformalJam: Boolean,
    SeekingBand: Boolean,
    Youtube: { type: String, optional: true },
    Soundcloud: { type: String, optional: true },
    Instagram: { type: String, optional: true },



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
