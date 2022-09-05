import { Schema, model, models } from 'mongoose';

const preferenceSchema = new Schema({
  email: {type: String, required: true, unique: true},
  name: String,
  tutorial: String,
});

const Staff = models.Staff || model('Staff', preferenceSchema);

export default Staff;