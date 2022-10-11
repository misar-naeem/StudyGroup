import connectMongo from "../../util/mongodb";
import Tutorial from "../../models/Tutorial";
import Student from "../../models/Student";

// Add a group configuration to a tutorial
export default async function handler(req, res) {
  try {
    await connectMongo();

    const query = { tutorialId: req.body.tutorialId };
    const update = { email: req.body.studentEmail };

    const tutorial = await Tutorial.updateMany(query, { $push: { "students": req.body.studentEmail } }
    );
    const student = await Student.updateMany(update, { $push: { "tutorials": req.body.tutorialId } })

    res.json({ tutorial, student });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
