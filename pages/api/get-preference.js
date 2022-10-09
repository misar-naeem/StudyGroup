import connectMongo from "../../util/mongodb";
import Preference from "../../models/Preference";

export default async function handler(req, res) {
  try {
    const { student, tutorial } = req.query;
    var result;

    await connectMongo();
    console.log(`${req.url} accessed`);

    result = await Preference.find({tutorialId: tutorial, studentId: student}).select("topic");
    res.json({ result });

  } catch (error) {
    console.log(error);
  }
}
