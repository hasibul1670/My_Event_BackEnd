import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import config from '../../config';
import ApiError from '../../handlingError/ApiError';
import { jwtHelpers } from '../../helpers/jwtHelpers';
import { Secret } from 'jsonwebtoken';
type CustomRequest = {
  user?: any;
} & Request;

const auth =
  (...requiredRoles: string[]) =>
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, 'You are not authorized');
      }

      let verifiedUser = null;
      verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);

      req.user = verifiedUser;
      if (
        requiredRoles.length &&
        !requiredRoles.includes(verifiedUser.userRole)
      ) {
        throw new ApiError(StatusCodes.FORBIDDEN, 'Forbidden');
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
