import { Moment } from "moment";

export type Theme = "light" | "dark";

export type Tag =
  | "Charity"
  | "Clothing"
  | "Commuting"
  | "Education"
  | "Entertainment"
  | "Food"
  | "Health"
  | "Housing"
  | "Financial"
  | "Investment"
  | "Present"
  | "Vehicle"
  | "Unpredicted";

export type TransactionType = {
  text: string;
  price: number;
  date: Moment;
  tag: Tag;
};

export enum dateFormats {
  TRANSACTION = "MMMM Do YYYY",
  CALENDAR_INPUT = "yyyy-MM-DD",
}
