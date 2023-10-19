import { Model } from 'mongoose';

export type IProduct = {
  name: string;
  productDescription: string;
  measurement: string;
  company: string;
  generic: string;
  category: string;
  url: string;
  price: number;
  imageUrl: string;
};

export type ProductModel = Model<IProduct>;

export type IproductFilters = {
  searchTerm?: string;
};
