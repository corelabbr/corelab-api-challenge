import { ObjectId } from "mongodb";
import db from "../databases/mongo.js";
import { VehiculeAd } from "../schemas/VehiculeAd.js";
import mapErrors from "../utils/errorMapper.js";


export default async function validateAd(req, res, next) {
  const {user} = req.headers;
  const ad = req.body;
  try {
    const {_id} = db.collection("users").findOne({email: user});
    const newAd = {...ad, userId: new ObjectId(_id) }
    const { error } = VehiculeAd.validate(newAd);
    if (error) {
      const errors = error.details.map(err => mapErrors(err));
      return res.status(422).send(errors);
    }
    res.locals.ad = newAd; 
    next();

  } catch (err) {
    res.status(500).send("validateAd: \n" + err);
  }
}