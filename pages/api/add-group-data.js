import connectMongo from "../../util/mongodb";
import Group from "../../models/Group";

export default async function handler(req, res) {
  try {
    console.log("CONNECTING TO MONGO");
    await connectMongo();
    console.log("CONNECTED TO MONGO");

    const groupData = {
      tutorial: "tut1",
      groupNumber: 2,
      students: [
        {
          name: "Stephen Brown",
          email: "stephen.brown-2@student.uts.edu.au",
        },
      ],
    };

    // const student = await Student.create(studentData);
    // const staff = await Staff.create(staffData);

    const group = await Group.create(groupData);

    res.json({ groupData });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
