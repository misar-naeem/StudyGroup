import connectMongo from "../../util/mongodb";
import Group from "../../models/Group";

// Takes the tutorial ID and deletes all related groups
export default async function handler(req, res) {
  try {
    console.log("CONNECTING TO MONGO");
    await connectMongo();
    console.log("CONNECTED TO MONGO");

    const {
      body: { tutorialId },
    } = req;

    const groupData = await Group.deleteMany({
      tutorialId: tutorialId,
    });

    res.json({ groupData });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
