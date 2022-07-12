import db from '../databases/mongo.js';

async function createAd(req, res) {
  const ad = res.locals.ad;
  let colorCode;
  switch (ad.color) {
    case "Vermelho":
      return colorCode = "red";
    case "Cinza":
      return colorCode = "gray";
  }
  const adObj = {
    ...ad,
    color: {
      code: colorCode,
      name: ad.color,
    }
  }
  console.log(adObj);
  try {
    await db.collection('ads').insertOne(adObj);
    res.status(201).send([{ text: "Anúncio criado com sucesso", label: "success" }])
  } catch (err) {
    res.status(500).send('createVehicule: \n' + err);
  }
}

async function getAds(req, res) {
  try {
    const vehicules = await db.collection('ads').find().toArray();
    res.status(200).send(vehicules);
  } catch (err) {
    res.status(500);
  }
}

export { createAd, getAds };
