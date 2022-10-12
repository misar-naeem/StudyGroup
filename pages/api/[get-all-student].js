import connectMongo from "../../util/mongodb";
import Student from "../../models/Student";

export default async function handler(req, res) {
  try {

    await connectMongo();
    console.log(`${req.url} accessed`);
    
    const result = await Student.find({
      tutorials: {$nin: ["tut2"]}
    });

    res.json({ result });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
