import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CustomRequest } from '../../middlewares/auth';
import { ILoginUserResponse, IRefreshTokenResponse } from './auth.interface';
import { AuthService } from './auth.service';

const sendLoginResponse = async (res: Response, message: string, data: any) => {
  sendResponse<ILoginUserResponse>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message,
    data,
  });
};

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.loginUser(loginData);
  const { refreshToken, ...others } = result;
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);
  sendLoginResponse(res, 'User Loggedin successfully !', others);
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in and Generate a new Access token successfully  !',
    data: result,
  });
});

const changePassword = catchAsync(async (req: CustomRequest, res: Response) => {
  const { ...passwordData } = req.body;
  const user = req.user;
  const result = await AuthService.changePassword(user, passwordData);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Password Changed successfully !',
    data: result,
  });
});

const logoutUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log('Hello', res);
    try {
      res.clearCookie('refreshToken');
    } catch (error) {
      next(error);
    }

    sendLoginResponse(res, 'User Logout successfully !', null);
  }
);

export const AuthController = {
  loginUser,
  refreshToken,
  changePassword,
  logoutUser,
};
