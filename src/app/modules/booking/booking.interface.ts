/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { IUser } from '../users/user.interface';

export type IBooking = {
  bookingId: string;
  paymentStatus: string;
  bookingStatus: string;
  totalAmount: string;
  paymentMethod: string;
  dateOfBirth?: string;
  bookingDate: string;
  user: Types.ObjectId | IUser;
  venue?: Types.ObjectId | IUser;
};

export type BookingModel = Model<IBooking>;

export type IBookingFilters = {
  searchTerm?: string;
  id?: string;
  bloodGroup?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
};
