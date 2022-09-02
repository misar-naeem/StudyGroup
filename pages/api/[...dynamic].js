import connectMongo from "../../util/mongodb";
import Student from "../../models/Student";

export default async function handler(req, res) {

    try {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');
        const email = "tamsin.low@student.uts.edu.au"

        //const result = Student.find({email: req.body.email})
        const result = await Student.find({email: email})

        console.log(result)

        res.json({ result })

    } catch (error) {
        console.log(error);
        res.json({ error });
    }
}