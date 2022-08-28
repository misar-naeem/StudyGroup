import { Schema, model, models } from 'mongoose';

const preferenceSchema = new Schema({
  tutorialId: String,
  studentId: String,
  topic: String,
  //Maybe these should be in the student information
  degree: String,
  year: Number,
});

const Preference = models.Preference || model('Preference', preferenceSchema);

export default Preference;