import connectMongo from "../../../util/mongodb";
import Tutorial from "../../../models/Tutorial";

// Get a tutorial by it's ID
export default async function handler(req, res) {
  try {
    const { tutorialId } = req.query;

    await connectMongo();
    console.log(`${req.url} accessed`);

    const result = await Tutorial.find({ tutorialId: tutorialId });

    res.json({ result });
  } catch (error) {
    console.log(error);
  }
}
