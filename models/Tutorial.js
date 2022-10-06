import { Schema, model, models } from "mongoose";

const tutorialSchema = new Schema({
  tutorialId: String,
  groupConfiguration: {
    groupSize: Number,
  },
  topicsReleased: Boolean,
  topics: [],
  students: [],
});

const Tutorial = models.Tutorial || model("Tutorial", tutorialSchema);

export default Tutorial;
