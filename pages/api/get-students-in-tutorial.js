import connectMongo from "../../util/mongodb";
import Student from "../../models/Student";
import Preference from "../../models/Preference";

export default async function handler(req, res) {
  try {
    const { tutorial } = req.query;

    await connectMongo();
    console.log(`${req.url} accessed`);
    
    var result = await Student.find({tutorials: {"$in": tutorial}});
    
    var students = []

    for (var i = 0; i < result.length; i++) {
        //const preference = await Preference.find({tutorialId: tutorial, studentId: result[i]["email"]})
        result[i] = result[i].toObject()
        result[i]["preference"] = "some preference"

        console.log(result)
        console.log(typeof(result[i]))
    }

    res.json({ result });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
