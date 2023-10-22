import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../handlingError/ApiError';
import { buildWhereConditions } from '../../../helpers/buildWhereCondition';
import { generateVenueId } from '../../../helpers/generateId';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { venueSearchableFields } from './venue.constant';
import { IVenue, IVenueFilters } from './venue.interface';
import { Venue } from './venue.model';

const createVenue = async (payload: IVenue) => {
  const id = await generateVenueId();
  const existingVenue = await Venue.findOne({ venueName: payload?.venueName });
  if (existingVenue) {
    throw new ApiError(StatusCodes.CONFLICT, 'Venue is already exists !!');
  }
  const result = (
    await (await Venue.create({ ...payload, id: id })).populate('packages')
  ).populate('review');

  return result;
};
//getAllVenue Service Section
const getAllVenues = async (
  filters: IVenueFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IVenue[]>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  const { searchTerm, ...filtersData } = filters;

  const { whereConditions, sortConditions } = buildWhereConditions(
    searchTerm,
    filtersData,
    venueSearchableFields,
    sortBy,
    sortOrder
  );

  const result = await Venue.find(whereConditions)
    .populate('seller')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Venue.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
//getSingleVenue Service Section
const getSingleVenue = async (id: string) => {
  const result = await Venue.findById(id).populate('seller');

  return result;
};
//updateVenue Service Section
const updateVenue = async (id: string, payload: Partial<IVenue>) => {
  const result = await Venue.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  }).populate('seller');
  return result;
};
//deleteVenue Service Code
const deleteVenue = async (id: string) => {
  const result = await Venue.findByIdAndDelete(id).populate('seller');
  return result;
};
export const VenueService = {
  createVenue,
  getAllVenues,
  getSingleVenue,
  deleteVenue,
  updateVenue,
};
