import { IVenueFilters } from './venue.interface';

export const locationEnum = [
  'Dhaka',
  'Chattogram',
  'Barishal',
  'Rajshahi',
  'Sylhet',
  'Comilla',
  'Rangpur',
  'Mymensingh',
];
export const cuisineEnum = ['Bangla', 'Chinese', 'Indian'];

//for searchTerm
export const venueSearchableFields = [
  'id',
  'name',
  'breed',
  'location',
  'label',
  'category',
];

export const venueFilterableFields: (keyof IVenueFilters)[] = [
  'searchTerm',
  'id',
  'name',
  'location',
  'breed',
  'price',
  'minPrice',
  'maxPrice',
];
