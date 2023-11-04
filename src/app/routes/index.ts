import express from 'express';

import { AuthRoutes } from '../modules/auth/auth.route';
import { UserRoutes } from '../modules/users/user.route';
import { VenueRoutes } from '../modules/venue/venue.route';
import { PackageRoutes } from '../modules/package/package.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/venue',
    route: VenueRoutes,
  },
  {
    path: '/package',
    route: PackageRoutes,
  },
];

moduleRoutes.forEach(r => router.use(r.path, r.route));

export default router;
