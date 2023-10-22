import express from 'express';
import { PackageController } from './package.controller';

const router = express.Router();
router.post('/create-request', PackageController.createPackage);
router.delete('/:id', PackageController.deletePackage);
router.get('/:id', PackageController.getAllPackages);

export const PackageRoutes = router;
