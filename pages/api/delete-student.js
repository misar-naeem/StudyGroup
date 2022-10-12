import connectMongo from "../../util/mongodb";
import Tutorial from "../../models/Tutorial";
import Student from "../../models/Student";

// Add a group configuration to a tutorial
export default async function handler(req, res) {
  try {
    console.log("CONNECTING TO MONGO");
    await connectMongo();
    console.log("CONNECTED TO MONGO");

    const query = { tutorialId: req.body.tutorialId };
    const update = { email: req.body.studentEmail };

    console.log("UPDATING DOCUMENT");
    const tutorial = await Tutorial.updateMany(query, {$pull: {"students": req.body.studentEmail}}
    );
    const student = await Student.updateMany(update, {$pull: {"tutorials": req.body.tutorialId}})
    console.log("UPDATED DOCUMENT");

    res.json({ tutorial, student });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
