import { Schema, model, models } from 'mongoose';


const preferenceSchema = new Schema({
  email: {type: String, required: true, unique: true},
  name: String,
  degree: String,
  year: Number,
  allocation: Boolean,
  group: String,
  tutorials: []
});

const Student = models.Student || model('Student', preferenceSchema);

export default Student;