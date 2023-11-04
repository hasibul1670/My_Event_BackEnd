import express from 'express';
import { PackageController } from './package.controller';

const router = express.Router();
router.post('/create-package', PackageController.createPackage);
router.get('/', PackageController.getAllPackages);
router.delete('/:id', PackageController.deletePackage);
router.get('/:id', PackageController.getSinglePackage);

export const PackageRoutes = router;
