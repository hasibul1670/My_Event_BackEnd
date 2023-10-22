import { Model, Schema } from 'mongoose';

export type locationEnum =
  | 'Dhaka'
  | 'Chattogram'
  | 'Barishal'
  | 'Rajshahi'
  | 'Sylhet'
  | 'Comilla'
  | 'Rangpur'
  | 'Mymensingh';

export type cuisineType = 'Bangla' | 'Chinese' | 'Indian';

export type IVenue = {
  id: string;
  venueName: string;
  isAvailable: boolean;
  isOpen: boolean;
  venueDetails: string;
  venueLocation: string;
  capacity: string;
  roomCapacity: string;
  venuePhoneNumber: number;
  cuisineType: cuisineType;
  packages: Schema.Types.ObjectId[];
  review: Schema.Types.ObjectId[];
  venueImages: string[];
};

export type VenueModel = Model<IVenue, Record<string, unknown>>;

export type IVenueFilters = {
  searchTerm?: string;
  id?: string;
  location?: string;
  breed?: string;
  name?: string;
  price?: number;
  minPrice?: number;
  maxPrice?: number;
};
