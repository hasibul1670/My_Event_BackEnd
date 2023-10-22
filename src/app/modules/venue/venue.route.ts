import express from 'express';
import { VenueController } from './venue.controller';

const router = express.Router();
router.post('/create-venue', VenueController.createVenue);
router.get('/:id', VenueController.getSingleVenue);
router.delete('/:id', VenueController.deleteVenue);
router.patch('/:id', VenueController.updateVenue);
router.get('/', VenueController.getAllVenues);

export const VenueRoutes = router;
