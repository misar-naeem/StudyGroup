import connectMongo from "../../util/mongodb";
import Student from "../../models/Student";
import Preference from "../../models/Preference";

export default async function handler(req, res) {
  try {
    const { tutorial } = req.query;

    await connectMongo();
    console.log(`${req.url} accessed`);
    
    var result = await Student.find({tutorials: {"$in": tutorial}});

    for (var i = 0; i < result.length; i++) {
        const preference = await Preference.find({tutorialId: tutorial, studentId: result[i]["email"]})

        result[i] = result[i].toObject()

        if (preference.length > 0) {
          result[i]["preference"] = preference[0]["topic"]
        } else {
          result[i]["preference"] = "No Topic"
          console.log("NOT PREFERENCE")
        }

        console.log(result)
    }

    res.json({ result });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
