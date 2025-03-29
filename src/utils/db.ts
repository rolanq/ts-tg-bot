import { STEPS_ENUM } from "constants/steps";
import * as dbModule from "../../db/models/index.cjs";
import { Model, ModelStatic } from "sequelize";
import { USER_STATE_ENUM } from "constants/userState";

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

export interface IUser {
  id: number;
  username: string;
  state: USER_STATE_ENUM;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ISavedSearch {
  id?: number;
  userId: number;
  filters: Record<string, any>;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAdvertisement {
  id?: number;
  regionId: number;
  brandId: number;
  modelId: number;
  engineType: string;
  horsePower: number;
  driveType: string;
  transmission: string;
  year: number;
  mileage: number;
  description: string;
  price: number;
  phoneNumber: string;
  telegramUsername: string;
  photos: string[];
  isActive: boolean;
  isOnHold: boolean;
  hideReason: string | null;
  userId: string;
  channelMessageId: number | null;
  channelText: string | null;
  channelStatus: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAdvertisementDraft {
  id?: number;
  regionId: number | null;
  brandId: number | null;
  modelId: number | null;
  engineType: string | null;
  horsePower: number | null;
  driveType: string | null;
  transmission: string | null;
  year: number | null;
  mileage: number | null;
  description: string | null;
  price: number | null;
  phoneNumber: string | null;
  photos: string[] | null;
  currentStep: STEPS_ENUM;
  telegramUsername: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const Brand: ModelStatic<Model<IBrand>> = db.Brand;
export const CarModel: ModelStatic<Model<ICarModel>> = db.CarModel;
export const Region: ModelStatic<Model<IRegion>> = db.Region;
export const ChannelMessage: ModelStatic<Model<IChannelMessage>> =
  db.ChannelMessage;
export const SavedSearch: ModelStatic<Model<ISavedSearch>> = db.SavedSearch;
export const Advertisement: ModelStatic<Model<IAdvertisement>> =
  db.Advertisement;
export const AdvertisementDraft: ModelStatic<Model<IAdvertisementDraft>> =
  db.AdvertisementDraft;
export const User: ModelStatic<Model<IUser>> = db.User;
