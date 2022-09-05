import connectMongo from "../../util/mongodb";
import Student from "../../models/Student";
import Staff from "../../models/Staff";


export default async function handler(req, res) {

    try {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        const studentData = {
            email: "tamsin.low@student.uts.edu.au",
            name: "Tamsin Low",
            degree: "Software Engineering",
            year: 3,
            tutorials: [
                "tut1"
            ]
          }

          const staffData = {
            email: "tamsin.low@student.uts.edu.au",
            name: "Tamsin Low",
            tutorial: "tut1"
          }

        // const student = await Student.create(studentData);
        // const staff = await Staff.create(staffData);

        res.json({ studentData, staffData })
        
    } catch (error) {
        console.log(error);
        res.json({ error });
    }
}