import db from '../databases/mongo.js';

async function createAd(req, res) {
  const ad = res.locals.ad;
  try {
    await db.collection('ads').insertOne(ad);
  } catch (err) {
    res.status(500).send('createVehicule: \n' + err);
  }
}

async function getAds(req, res) {
  try {
    const vehicules = await db.collection('vehicules').find().toArray();
    res.status(200).send(vehicules);
  } catch (err) {
    res.status(500);
  }
}

export { createAd, getAds };
