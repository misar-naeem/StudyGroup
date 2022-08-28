import { Schema, model, models } from 'mongoose';

const preferenceSchema = new Schema({
  studentId: {type: String, required: true, unique: true},
  firstName: String,
  lastName: String,
  email: String,
  //Maybe these should be in the student information
  degree: String,
  year: Number,
});

const Student = models.Preference || model('Student', preferenceSchema);

export default Student;