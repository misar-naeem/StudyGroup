import { Schema, model, models } from "mongoose";

const groupSchema = new Schema({
  tutorials: [],
  students: [
    {
      name: String,
      email: String,
      id: Number,
    },
  ],
});

const Group = models.Group || model("Group", groupSchema);

export default Group;
