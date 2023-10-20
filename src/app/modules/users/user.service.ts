/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { StatusCodes } from 'http-status-codes';
import config from '../../../config';
import ApiError from '../../../handlingError/ApiError';
import { buildWhereConditions } from '../../../helpers/buildWhereCondition';
import { generateUserId } from '../../../helpers/generateId';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { userSearchableFields } from './user.constant';
import { IUser, IUserFilters } from './user.interface';
import { User } from './user.model';

const getAllUsers = async (
  filters: IUserFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IUser[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const { whereConditions, sortConditions } = buildWhereConditions(
    searchTerm,
    filtersData,
    userSearchableFields,
    sortBy,
    sortOrder
  );
  const result = await User.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById({ _id: id });
  return result;
};

const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const result = await User.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(id);
  return result;
};
const getUserName = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

const createUser = async (payload: IUser): Promise<Partial<IUser>> => {
  if (!payload.password) {
    payload.password = config.default_user_pass as string;
  }
  const givenRole = payload?.role;

  const id = await generateUserId(givenRole);

  const existingUser = await User.findOne({ email: payload?.email });
  if (existingUser) {
    throw new ApiError(StatusCodes.CONFLICT, 'User is already exists !!');
  }
  const createdUser = await User.create({ ...payload, id: id });
  const { password, ...result } = createdUser.toObject();
  return result;
};

export const UserService = {
  getAllUsers,
  createUser,
  getUserName,
  getSingleUser,
  updateUser,
  deleteUser,
};
