import connectMongo from "../../util/mongodb";
import Staff from "../../models/Staff";

export default async function handler(req, res) {
  try {
    const { staff, tutorial } = req.query;
    var result;

    await connectMongo();
    console.log(`${req.url} accessed`);

    if (staff != undefined) {
      result = await Staff.find({ email: staff });
      res.json({ result });
    } else {
      result = await Staff.find({ tutorial: tutorial });
    }    

    res.json({ result });
  } catch (error) {
    console.log(error);
  }
}
