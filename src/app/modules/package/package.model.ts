import { Schema, model } from 'mongoose';
import { IPackage, PackageModel } from './package.interface';
const PackageSchema = new Schema<IPackage>(
  {
    quantity: {
      type: Number,
      required: true,
    },
    productDescription: {
      type: String,
      required: true,
    },
    requestedId: {
      type: String,
    },
    requestedTime: {
      type: String,
    },
    status: {
      type: String,
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

export const Package = model<IPackage, PackageModel>('Package', PackageSchema);
