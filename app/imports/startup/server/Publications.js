import { Meteor } from 'meteor/meteor';
import { Accounts } from '../../api/account/Accounts';

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise publish nothing.
Meteor.publish(Accounts.userPublicationName, function () {
  if (this.userId) {
    const email = Meteor.users.findOne(this.userId).email;
    return Accounts.collection.find({ email: email });
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
