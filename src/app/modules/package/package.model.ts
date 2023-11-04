import { Schema, model } from 'mongoose';
import { IPackage, PackageModel } from './package.interface';

const PackageSchema = new Schema<IPackage>(
  {
    menuName: {
      type: String,
      required: true,
    },
    itmes: {
      type: [
        {
          type: String,
          required: true,
        },
      ],
    },
    price: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Package = model<IPackage, PackageModel>('Package', PackageSchema);
