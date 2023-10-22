import { Model } from 'mongoose';

export type IPackage = {
  productDescription: string;
  quantity: number;
  requestedId: string;
  requestedTime: string;
  status: string;
};

export type PackageModel = Model<IPackage>;
