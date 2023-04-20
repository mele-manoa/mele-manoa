import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class PeopleCollection {
  constructor() {
    this.name = 'PeopleCollection';
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
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const People = new PeopleCollection();
