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
    var preferenceFound = false;

    /*
    The loop belows matches the student's email with the preference's email, and
    adds "topic" from Preference.find() to "preference" in Student.find()
    */

    for (var i = 0; i < result.length; i++) {
      result[i] = result[i].toObject();
      preferenceFound = false;
      for (var j = 0; j < preference.length; j++) {
        if (result[i]["email"] == preference[j]["studentId"]) {
          result[i]["preference"] = preference[j]["topic"];
          preferenceFound = true;
          break;
        }
      }
      if (!preferenceFound) {
        result[i]["preference"] = "No preference";
      }
    }

    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
