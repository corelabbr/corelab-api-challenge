import { Router } from 'express';
import { createAd, getAds } from '../controllers/vehiculeAdController.js';
import validateAd from '../middlewares/validateAdMiddleware.js';

const route = Router();

route.post('/ad', validateAd, createAd);
route.get('/ad', getAds);

export default route;
