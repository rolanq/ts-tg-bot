export enum SessionAdCreationSteps {
  MARK = "MARK",
  MODEL = "MODEL",
  YEAR = "YEAR",
  PRICE = "PRICE",
  DESCRIPTION = "DESCRIPTION",
  PHOTOS = "PHOTOS",
  PHONE = "PHONE",
}

export type SessionAdCreation = {
  step: SessionAdCreationSteps;
  mark: string;
  model: string;
  year: string;
  price: string;
  description: string;
  photos: string[];
  phone: string;
};
