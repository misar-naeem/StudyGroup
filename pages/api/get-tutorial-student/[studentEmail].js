import connectMongo from "../../../util/mongodb";
import Tutorial from "../../../models/Tutorial";

export default async function handler(req, res) {
  try {
    const {studentEmail}  = req.query;
    
    console.log()

    await connectMongo();
    console.log(`${req.url} accessed`);
    
    const result = await Tutorial.find({
        students:{ $in: [studentEmail]}
    }).select("tutorialId topicsReleased");

    console.log(result)
    res.json({ result });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
