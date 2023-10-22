/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { statusOption } from './booking.constant';
import { BookingModel, IBooking } from './booking.interface';

export const BookingSchema = new Schema<IBooking, BookingModel>(
  {
    bookingId: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: statusOption,
      default: 'Pending',
    },
    bookingStatus: {
      type: String,
      enum: statusOption,
      default: 'Pending',
    },
    totalAmount: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    bookingDate: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    venue: {
      type: Schema.Types.ObjectId,
      ref: 'Venue',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Booking = model<IBooking, BookingModel>('Booking', BookingSchema);
