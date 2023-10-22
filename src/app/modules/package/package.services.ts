import { customDateFormat } from '../../../helpers/customDateFormat';
import { IPackage } from './package.interface';
import { Package } from './package.model';

const createPackage = async (payload: IPackage): Promise<IPackage> => {
  const date = new Date();
  const formattedDate = customDateFormat(date);
  const PackagePayload = { ...payload, requestedTime: formattedDate };
  const result = await Package.create(PackagePayload);
  return result;
};

const getAllPackages = async (id: string) => {
  const allRequest = await Package.find({}).lean();
  const filteredNotes = allRequest.filter(
    (pr: { requestedId: string }) => pr.requestedId && pr.requestedId === id
  );
  return filteredNotes;
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
