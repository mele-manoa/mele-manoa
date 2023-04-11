import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

class UsersCollection {
  constructor() {
    this.name = 'UsersCollection';
    this.collection = new Mongo.Collection(this.name);

    this.schema = new SimpleSchema({
      name: String,
      instrument: ['guitar', 'bass', 'drums', 'vocals', 'piano', 'strings', 'winds', 'percussion', 'brass', 'other'],
      genre: ['rock', 'jazz', 'EDM', 'dubstep', 'country', 'pop', 'classical', 'rhythm and blues'],
      skill: ['beginner', 'intermediate', 'expert', 'professional'],
      InformalJam: Boolean,
      BandSeeking: Boolean,
    }, { tracker: Tracker });
    this.collection.attachSchema(this.schema);
  }
}

export const Users = new UsersCollection();
