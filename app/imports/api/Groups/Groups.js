import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

class GroupsCollection {
  constructor() {
    this.name = 'GroupsCollection';
    this.collection = new Mongo.Collection(this.name);

    this.schema = new SimpleSchema({
      Name: String,
      Genre: ['Rock', 'Jazz', 'EDM', 'Dubstep', 'Country', 'Pop', 'Classical', 'RhythmAndBlues'],
      Members: [],
      Skill: ['Beginner', 'Intermediate', 'Expert', 'Professional'],
      OpenToMember: Boolean,
    }, { tracker: Tracker });
    this.collection.attachSchema(this.schema);
  }
}

export const Users = new GroupsCollection();
