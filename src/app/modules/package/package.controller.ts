/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendReponse from '../../../shared/sendResponse';
import { IPackage } from './package.interface';
import { PackageService } from './package.services';

const sendPackageResponse = (res: Response, message: string, data: any) => {
  sendReponse<IPackage>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message,
    data,
  });
};

const createPackage = catchAsync(async (req: Request, res: Response) => {
  const { ...PackageData } = req.body;
  const result = await PackageService.createPackage(PackageData);
  sendPackageResponse(res, 'Package is Created Successfully!', result);
});

const getAllPackages = catchAsync(async (req: Request, res: Response) => {
  const result = await PackageService.getAllPackages();
  sendPackageResponse(res, 'Packages retrieved successfully !', result);
});

const deletePackage = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await PackageService.deletePackage(id);
  sendPackageResponse(res, ' Package Deleted successfully !', result);
});
const getSinglePackage = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await PackageService.getSinglePackage(id);
  sendPackageResponse(res, 'Single Package retrieved successfully !', result);
});

export const PackageController = {
  createPackage,
  getAllPackages,
  getSinglePackage,
  deletePackage,
};
