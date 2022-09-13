import connectMongo from "../../util/mongodb";
import Preference from "../../models/Preference";

export default async function handler(req, res) {

    try {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        const query = {tutorialId: req.body.tutorialId, studentId: req.body.studentId}
        const exists = await Preference.exists(query)
        console.log(exists)

        if (exists == null) {

            console.log("CREATING PREFERENCE");
            const preference = await Preference.create({
                tutorialId: req.body.tutorialId,
                studentId: req.body.studentId,
                topic: req.body.topic
            })
            console.log('CREATED PREFERENCE');
            res.json({ preference })

        } else {
            console.log('PREFERENCE ALREADY EXISTS. SKIPPING CREATION...');
            res.json({"No":"Creation"})
        }

    } catch (error) {
        console.log(error);
        res.json({ error });
    }
}