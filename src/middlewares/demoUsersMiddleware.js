import db from "../databases/mongo.js"

const users = [
  {
    email: 'user01@gmail.com',
  },
  {
    email: 'user02@gmail.com',
  },
]

export default async function demoUsers() {
  try {
    const user = await db.collection("users").find().toArray();
    if (user.length === 0 ) {
      await db.collection("users").insertMany(users);
    } 
  } catch (err) {
    console.log(err);
  }
}