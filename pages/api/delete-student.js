import connectMongo from "../../util/mongodb";
import Tutorial from "../../models/Tutorial";
import Student from "../../models/Student";
import Group from "../../models/Group";

// Add a group configuration to a tutorial
export default async function handler(req, res) {
  try {
    console.log("CONNECTING TO MONGO");
    await connectMongo();
    console.log("CONNECTED TO MONGO");

    const query = { tutorialId: req.body.tutorialId };
    const update = { email: req.body.student.email };
    const groupNumber = req.body.groupNumber

    console.log(groupNumber);
    console.log(req.body.tutorialId)


    console.log("UPDATING DOCUMENT");
    const tutorial = await Tutorial.updateOne(query, { $pull: { "students": req.body.student.email } }
    );
    const student = await Student.updateOne(update, { $pull: { "tutorials": req.body.tutorialId } })
    console.log("UPDATED DOCUMENT");

    if (req.body.groupNumber !== 0) {
      const ActualGroup = await Group.updateOne({ tutorialId: req.body.tutorialId, groupNumber: groupNumber }, { $pull: { students: { _id: req.body.student._id } } });

    }
    res.json({ tutorial, student });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
