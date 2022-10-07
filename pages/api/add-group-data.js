import connectMongo from "../../util/mongodb";
import Group from "../../models/Group";

// Adds groups
export default async function handler(req, res) {
  try {
    console.log("CONNECTING TO MONGO");
    await connectMongo();
    console.log("CONNECTED TO MONGO");

    const {
      body: { tutorialId, groupNumber, students },
    } = req;

    const groupData = await Group.create({
      tutorialId: tutorialId,
      groupNumber: groupNumber,
      students: students,
    });

    res.json({ groupData });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
