import connectMongo from "../../util/mongodb";
import Student from "../../models/Student";
import Preference from "../../models/Preference";

export default async function handler(req, res) {
  try {
    const { tutorial } = req.query;

    await connectMongo();
    console.log(`${req.url} accessed`);

    var result = await Student.find({ tutorials: { $in: tutorial } });
    var preference = await Preference.find({ tutorialId: tutorial });

    /*
    The loop belows matches the student's email with the preference's email, and
    adds "topic" from Preference.find() to "preference" in Student.find()
    */

    for (var i = 0; i < preference.length; i++) {
      for (var j = 0; j < result.length; j++) {
        if (preference[i]["studentId"] == result[j]["email"]) {
          result[j]["preference"] = preference[i]["topic"];
        }
      }
    }

    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
