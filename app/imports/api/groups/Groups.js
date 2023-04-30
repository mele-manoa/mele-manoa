import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class GroupsCollection {
  constructor() {
    this.name = 'GroupsCollection';
    this.collection = new Mongo.Collection(this.name);

    this.schema = new SimpleSchema({
      name: String,
      image: String,
      genre: {
        type: String,
        allowedValues: ['Rock', 'Jazz', 'EDM', 'Dubstep', 'Country', 'Pop', 'Classical', 'RhythmAndBlues'],
        defaultValue: 'Rock',
      },
      members: {
        type: Array,
        defaultValue: ['John Doe'], // Add a default member here
      },
      'members.$': String, // Define the array items as strings
      skill: {
        type: String,
        allowedValues: ['Beginner', 'Intermediate', 'Expert', 'Professional'],
        defaultValue: 'Beginner',
      },
      openToMembers: {
        type: Boolean,
        allowedValues: [true, false],
        defaultValue: false,
      },
    });
    this.collection.attachSchema(this.schema);
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const Groups = new GroupsCollection();
