import connectMongo from "../../util/mongodb";
import Tutorial from "../../models/Tutorial";

// Add a group configuration to a tutorial
export default async function handler(req, res) {
  try {
    console.log("CONNECTING TO MONGO");
    await connectMongo();
    console.log("CONNECTED TO MONGO");

    const query = { _id: req.body.tutorialId };
    const update = { groupConfiguration: req.body.groupConfiguration };

    console.log("UPDATING DOCUMENT");
    const tutorial = await Tutorial.findOneAndUpdate(query, update, {
      new: true,
    });
    console.log("UPDATED DOCUMENT");

    res.json({ tutorial });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
