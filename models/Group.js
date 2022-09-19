import { Schema, model, models } from "mongoose";

const groupSchema = new Schema({
  tutorial: String,
  groupNumber: Number,
  students: [
    {
      name: String,
      email: String,
    },
  ],
});

const Group = models.Group || model("Group", groupSchema);

export default Group;
