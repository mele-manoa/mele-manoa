import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

class GroupsCollection {
  constructor() {
    this.name = 'GroupsCollection';
    this.collection = new Mongo.Collection(this.name);

    this.schema = new SimpleSchema({
      name: String,
      image: String,
      genre: ['Rock', 'Jazz', 'EDM', 'Dubstep', 'Country', 'Pop', 'Classical', 'RhythmAndBlues'],
      skill: ['Beginner', 'Intermediate', 'Expert', 'Professional'],
      members: [],
      openToMembers: {
        type: Boolean,
        allowedValues: [true, false],
        defaultValue: false,
      },
    }, { tracker: Tracker });
    this.collection.attachSchema(this.schema);
  }
}

export const Users = new GroupsCollection();
