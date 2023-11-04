import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../handlingError/ApiError';
import { IPackage } from './package.interface';
import { Package } from './package.model';

const createPackage = async (payload: IPackage): Promise<IPackage> => {
  const existingPackage = await Package.findOne({
    menuName: payload?.menuName,
  });
  if (existingPackage) {
    throw new ApiError(
      StatusCodes.CONFLICT,
      'This Package is already exists !!'
    );
  }
  const result = await Package.create(payload);
  return result;
};

const getAllPackages = async () => {
  const allRequest = await Package.find({}).lean();
  return allRequest;
};

const getSinglePackage = async (id: string) => {
  const result = await Package.findById({ _id: id });
  return result;
};

const deletePackage = async (id: string) => {
  const result = await Package.findByIdAndDelete({ _id: id });
  return result;
};

export const PackageService = {
  createPackage,
  deletePackage,
  getAllPackages,
  getSinglePackage,
};
