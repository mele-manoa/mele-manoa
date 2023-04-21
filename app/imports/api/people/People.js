import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class PeopleCollection {
  constructor() {
    this.name = 'PeopleCollection';
    this.collection = new Mongo.Collection(this.name);

    this.schema = new SimpleSchema({
      email: String,
      name: String,
      image: String,
      instrument: {
        type: String,
        allowedValues: ['Guitar', 'Bass', 'Drums', 'Vocals', 'Piano', 'Strings', 'Winds', 'Percussion', 'Brass', 'Other'],
        defaultValue: 'Other',
      },
      genre: {
        type: String,
        allowedValues: ['Rock', 'Jazz', 'EDM', 'Dubstep', 'Country', 'Pop', 'Classical', 'RhythmAndBlues'],
        defaultValue: 'Rock',
      },
      skill: {
        type: String,
        allowedValues: ['Beginner', 'Intermediate', 'Expert', 'Professional'],
        defaultValue: 'Beginner',
      },
      informalJam: {
        type: Boolean,
        allowedValues: [true, false],
        defaultValue: false,
      },
      seekingBand: {
        type: Boolean,
        allowedValues: [true, false],
        defaultValue: false,
      },
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
