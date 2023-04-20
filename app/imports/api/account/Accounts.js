import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

class AccountsCollection {
  constructor() {
    this.name = 'AccountsCollection';
    this.collection = new Mongo.Collection(this.name);

    this.schema = new SimpleSchema({
      name: String,
      email: String,
      image: String,
      instrument: ['Guitar', 'Bass', 'Drums', 'Vocals', 'Piano', 'Strings', 'Winds', 'Percussion', 'Brass', 'Other'],
      genre: ['Rock', 'Jazz', 'EDM', 'Dubstep', 'Country', 'Pop', 'Classical', 'RhythmAndBlues'],
      skill: ['Beginner', 'Intermediate', 'Expert', 'Professional'],
      informalJam: Boolean,
      seekingBand: Boolean,
      youtube: { type: String, optional: true },
      soundcloud: { type: String, optional: true },
      instagram: { type: String, optional: true },
    }, { tracker: Tracker });
    this.collection.attachSchema(this.schema);
  }
}

export const Accounts = new AccountsCollection();
