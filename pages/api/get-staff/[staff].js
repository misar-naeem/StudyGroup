import connectMongo from "../../../util/mongodb";
import Staff from "../../../models/Staff";

export default async function handler(req, res) {

    try {
        // const { staff } = req.query

        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');
        const staff = "tamsin.low@student.uts.edu.au"

        //const result = Student.find({email: req.body.email})
        const result = await Staff.find({email: staff})

        console.log(result)

        res.json({ result })

    } catch (error) {
        console.log(error);
        res.json({ error });
    }
}