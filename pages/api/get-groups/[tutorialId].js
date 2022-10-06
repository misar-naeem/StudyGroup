import connectMongo from "../../../util/mongodb";
import Group from "../../../models/Group";

// Get groups that belong to a tutorial
export default async function handler(req, res) {
  try {
    const { tutorialId } = req.query;

    await connectMongo();
    console.log(`${req.url} accessed`);

    const result = await Group.find({ tutorialId: tutorialId });

    res.json({ result });
  } catch (error) {
    console.log(error);
  }
}
