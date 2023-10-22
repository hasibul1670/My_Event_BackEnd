import { Schema, model } from 'mongoose';
import { cuisineEnum, locationEnum } from './venue.constant';
import { IVenue, VenueModel } from './venue.interface';

export const VenueSchema = new Schema<IVenue, VenueModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    isOpen: {
      type: Boolean,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      required: true,
    },
    venueName: {
      type: String,
      required: true,
    },
    venueDetails: {
      type: String,
      required: true,
    },
    venueLocation: {
      type: String,
      required: true,
      enum: locationEnum,
    },
    capacity: {
      type: String,
      required: true,
    },
    roomCapacity: {
      type: String,
      required: true,
    },
    venuePhoneNumber: {
      type: Number,
      required: true,
    },
    cuisineType: {
      type: String,
      enum: cuisineEnum,
      required: true,
    },
    packages: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Package',
      },
    ],
    review: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review',
      },
    ],
    venueImages: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Venue = model<IVenue>('Venue', VenueSchema);
