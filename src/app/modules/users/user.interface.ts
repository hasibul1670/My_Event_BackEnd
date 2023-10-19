/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type UserName = {
  firstName: string;
  lastName: string;
};
export type IUser = {
  id: string;
  role: string;
  password: string;
  email: string;
  name: UserName;
  gender: 'male' | 'female';
  phoneNumber: string;
  address: string;
  profileImage?: string;
};

export type UserModel = {
  isUserExist(
    email: string
  ): Promise<Pick<IUser, 'email' | 'password' | 'role'>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;

export type IUserFilters = {
  searchTerm?: string;
  id?: string;
  bloodGroup?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
};
