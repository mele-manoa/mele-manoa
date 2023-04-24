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
      members: [],
      skill: ['Beginner', 'Intermediate', 'Expert', 'Professional'],
      openToMember: Boolean,
    }, { tracker: Tracker });
    this.collection.attachSchema(this.schema);
  }
}

export const Users = new GroupsCollection();
