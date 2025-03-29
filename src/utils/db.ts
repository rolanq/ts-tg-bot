import * as dbModule from "../../db/models/index.cjs";
import { Model, ModelStatic } from "sequelize";

const db = (dbModule as any).default || dbModule;

export interface IBrand {
  id: number;
  name: string;
}

export interface ICarModel {
  id: number;
  name: string;
  brandId: number;
}

export interface IRegion {
  id: number;
  name: string;
}

export interface IChannelMessage {
  id: number;
  channelId: string;
  messageId: number;
  advertisementId: number;
}

export interface ISavedSearch {
  id: number;
  userId: number;
  filters: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAdvertisement {
  id: number;
  brandId: number;
  modelId: number;
  year: number;
  price: number;
  description: string;
  photos: string[];
  phone: string;
  regionId: number;
  userId: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export const Brand: ModelStatic<Model<IBrand>> = db.Brand;
export const CarModel: ModelStatic<Model<ICarModel>> = db.CarModel;
export const Region: ModelStatic<Model<IRegion>> = db.Region;
export const ChannelMessage: ModelStatic<Model<IChannelMessage>> =
  db.ChannelMessage;
export const SavedSearch: ModelStatic<Model<ISavedSearch>> = db.SavedSearch;
export const Advertisement: ModelStatic<Model<IAdvertisement>> =
  db.Advertisement;
