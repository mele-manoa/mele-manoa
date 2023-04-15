import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

class GroupsCollection {
  constructor() {
    this.name = 'GroupsCollection';
    this.collection = new Mongo.Collection(this.name);

    this.schema = new SimpleSchema({
      name: String,
      genre: ['rock', 'jazz', 'EDM', 'dubstep', 'country', 'pop', 'classical', 'rhythm and blues'],
      members: [],
      skill: ['beginner', 'intermediate', 'expert', 'professional'],
      OpenToMember: Boolean,
    }, { tracker: Tracker });
    this.collection.attachSchema(this.schema);
  }
}

export const Users = new GroupsCollection();
