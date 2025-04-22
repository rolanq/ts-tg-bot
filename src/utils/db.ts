import { STEPS_ENUM, USER_STATE_ENUM, HIDE_REASONS } from "constants/config";
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

export interface IUser {
  id: string;
  username: string;
  state: USER_STATE_ENUM;
  availableListings: number;
  isAdmin: boolean;
  isBanned: boolean;
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
  telegramUsername?: string;
  autotekaLink: string | null;
  photos: string[];
  isActive: boolean;
  isOnHold: boolean;
  hideReason: HIDE_REASONS | null;
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
  photos: string[];
  currentStep: STEPS_ENUM;
  telegramUsername?: string;
  userId: string;
  autotekaLink: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ISavedSearch {
  id?: number;
  userId: string;
  brandId: number | null;
  regionId: number | null;
  priceFrom: number | null;
  priceTo: number | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface INotification {
  id?: number;
  userId: string;
  brandId: number | null;
  regionId: number | null;
  priceFrom: number | null;
  priceTo: number | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IMessageToDelete {
  id?: number;
  userId: string;
  messagesToDelete: number[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IBotSettings {
  id?: number;
  WatermarkText: string;
  SupportUsername: string;
  SupportText: string;
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
export const Notification: ModelStatic<Model<INotification>> = db.Notification;
export const MessageToDelete: ModelStatic<Model<IMessageToDelete>> =
  db.MessageToDelete;
export const BotSettings: ModelStatic<Model<IBotSettings>> = db.BotSettings;
