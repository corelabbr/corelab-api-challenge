import { ObjectId } from "mongodb";
import db from "../databases/mongo.js";

async function addFavorite(req, res) {
  const myFavorite = res.locals.favorite;
  try {
    await db.collection("favorites").insertOne(myFavorite);
    res.status(201).send(myFavorite);
  } catch (err) {
    res.status(500).send("addFavorite: \n" + err)
  }
}

async function getFavorites(req, res) {
  const { user } = req.headers;
  try {
    const favorites = await db.collection("favorites").find().toArray();
    const { _id } = await db.collection("users").findOne({ email: user })
    
    const myFavorites = favorites.filter(favorite => favorite.userId.str === _id.str);
    res.status(200).send(myFavorites);
  } catch (err) {
    res.status(500).send("getFavorites: \n" + err);
  }
}

export { addFavorite, getFavorites };