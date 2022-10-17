import connectMongo from "../../util/mongodb";
import Group from "../../models/Group";

// Add a group configuration to a tutorial
export default async function handler(req, res) {
    try {
        console.log("CONNECTING TO MONGO");
        await connectMongo();
        console.log("CONNECTED TO MONGO");

        const studentId = req.body.studentId;
        const oldGroup = req.body.oldGroup;
        const tutorialId = req.body.tutorialId;
        const newGroup = req.body.newGroup;

        console.log(studentId, oldGroup, tutorialId);
        console.log("UPDATING DOCUMENT");
        const ActualGroup = await Group.updateOne({ tutorialId: tutorialId, groupNumber: oldGroup }, { $pull: { students: { email: studentId } } });
        const result = await Group.updateOne({ tutorialId: tutorialId, groupNumber: newGroup }, { $push: { students: { email: studentId } } });
        console.log("UPDATED DOCUMENT");
        res.json({ result });
    } catch (error) {
        console.log(error);
        res.json({ error });
    }
}
