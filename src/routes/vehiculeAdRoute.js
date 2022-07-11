import { Router } from 'express';
import { createAd, getAds } from '../controllers/vehiculeAdController.js';

const route = Router();

route.post('/ad', createAd);
route.get('/ad', getAds);

export default route;
