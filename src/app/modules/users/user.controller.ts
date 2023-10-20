import { Request, Response } from 'express';

import { StatusCodes } from 'http-status-codes';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { default as sendReponse } from '../../../shared/sendResponse';
import { IUser } from './user.interface';
import { UserService } from './user.service';
import { userFilterableFields } from './user.constant';

const sendUserResponse = async (res: Response, message: string, data: any) => {
  sendReponse<IUser>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message,
    data,
  });
};

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { ...User } = req.body;
  const result = await UserService.createUser(User);
  sendUserResponse(res, 'User is created successfully', result);
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await UserService.getAllUsers(filters, paginationOptions);
  sendUserResponse(res, ' All Users  return successfully', result);
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.getSingleUser(id);
  sendUserResponse(res, ' Single User retrieved successfully !', result);
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;

  const result = await UserService.updateUser(id, updatedData);

  sendUserResponse(res, 'User updated successfully !', result);
});
const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UserService.deleteUser(id);
  sendUserResponse(res, 'User deleted successfully !', result);
});

const getUserName = catchAsync(async (req: Request, res: Response) => {
  const email = req.params.email;
  const result = await UserService.getUserName(email);
  sendUserResponse(res, 'User Data Get successfully !', result);
});

export const UserController = {
  getAllUsers,
  createUser,
  getUserName,
  getSingleUser,
  updateUser,
  deleteUser,
};
