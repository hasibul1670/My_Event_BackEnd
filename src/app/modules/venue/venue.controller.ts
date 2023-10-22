import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendReponse from '../../../shared/sendResponse';
import { IVenue } from './venue.interface';
import { venueFilterableFields } from './venue.constant';
import { VenueService } from './venue.service';

const sendVenueResponse = async (res: Response, message: string, data: any) => {
  sendReponse<IVenue>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message,
    data,
  });
};
//create a Venue
const createVenue = catchAsync(async (req: Request, res: Response) => {
  const { ...VenueData } = req.body;
  const result = await VenueService.createVenue(VenueData);
  sendVenueResponse(res, 'Venue is created successfully', result);
});

//Get all Venues
const getAllVenues = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, venueFilterableFields);

  const paginationOptions = pick(req.query, paginationFields);

  const result = await VenueService.getAllVenues(filters, paginationOptions);

  sendVenueResponse(res, ' All Venue Venues fetched successfully', result);
});
//Get a Single Venue
const getSingleVenue = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await VenueService.getSingleVenue(id);

  sendVenueResponse(res, 'Single Venue is found', result);
});

//Update Venue
const updateVenue = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await VenueService.updateVenue(id, req.body);

  await sendVenueResponse(res, `Venue is Updated successfully`, result);
});
//Delete a Single Venue
const deleteVenue = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await VenueService.deleteVenue(id);

  await sendVenueResponse(res, `Venue is Deleted successfully`, result);
});
export const VenueController = {
  createVenue,
  deleteVenue,
  getAllVenues,
  getSingleVenue,
  updateVenue,
};
