/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type IUser = {
  id: string;
  firstName: string;
  lastName: string;
  isBanned: boolean;
  role: 'user' | 'admin' | 'vendor';
  password: string;
  email: string;
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
