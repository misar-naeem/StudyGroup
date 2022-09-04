import connectMongo from "../../../util/mongodb";
import Staff from "../../../models/Staff";

export default async function handler(req, res) {
  try {
    const { staff } = req.query;

    await connectMongo();
    console.log(`${req.url} accessed`);

    const result = await Staff.find({ email: staff });

    res.json({ result });
  } catch (error) {
    console.log(error);
  }
}
