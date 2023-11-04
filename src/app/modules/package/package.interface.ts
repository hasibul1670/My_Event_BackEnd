import { Model } from 'mongoose';

export type IPackage = {
  menuName: string;
  itmes: [];
  price: string;
};

export type PackageModel = Model<IPackage>;
