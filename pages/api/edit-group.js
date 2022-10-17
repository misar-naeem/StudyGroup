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
        const query = { tutorialId: req.body.tutorialId };
        const update = { newGroup: req.body.newGroup };

        console.log("UPDATING DOCUMENT");
        const ActualGroup = await Group.find({ tutorialId: tutorialId, groupNumber: oldGroup, students: { $elemMatch: { email: "tamsin.low@student.uts.edu.au" } } });
        console.log("UPDATED DOCUMENT");

        res.json({ ActualGroup });
    } catch (error) {
        console.log(error);
        res.json({ error });
    }
}
