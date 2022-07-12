import { ObjectId } from "mongodb";
import db from "../databases/mongo.js";

async function validateFavorite(req, res, next) {
  const {user} = req.headers;
  const { adId } = req.body;
  console.log(user);
  try {
    const { _id } = await db.collection("users").findOne({ email: user });
    res.locals.favorite = { adId, userId: new ObjectId(_id) };
    next();
  } catch (err) {
    res.status(500).send("validateFavorite: \n" + err);
  }
}

export default validateFavorite;