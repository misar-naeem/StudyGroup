import { Schema, model, models } from "mongoose";

const groupSchema = new Schema({
  tutorialId: String,
  groupNumber: Number,
  students: [{ email: String }],
});

const Group = models.Group || model("Group", groupSchema);

export default Group;