import { Schema, model, models } from "mongoose";

const groupSchema = new Schema({
  tutorialId: String,
  groupNumber: Number,
  students: [],
});

const Group = models.Group || model("Group", groupSchema);

export default Group;