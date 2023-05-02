import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class GroupsCollection {
  constructor() {
    this.name = 'GroupsCollection';
    this.collection = new Mongo.Collection(this.name);

    this.schema = new SimpleSchema({
      name: String,
      image: { type: String, optional: true },
      genre: {
        type: String,
        allowedValues: ['Rock', 'Metal', 'Jazz', 'R&B', 'Reggae', 'Indie', 'Country', 'Pop', 'Latin', 'Classical', 'Electronic', 'Other'],
        defaultValue: 'Rock',
      },
      members: {
        type: Array,
        defaultValue: [],
      },
      'members.$': String, // Define the array items as strings
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
