import db from '../databases/mongo';

async function createVehicule(req, res) {
  const vehicule = req.body;
  try {
    db.collection('vehicules').insertOne(vehicule);
  } catch (err) {
    res.status(500).send(`createVehicule\n${err}`);
  }
}

async function getVehicules(req, res) {
  try {
    const vehicules = await db.collection('vehicules').find().toArray();
    res.status(200).send(vehicules);
  } catch (err) {
    res.status(500);
  }
}

export { createVehicule, getVehicules };
