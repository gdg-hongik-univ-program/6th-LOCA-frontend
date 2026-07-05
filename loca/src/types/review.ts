export type Companion = "alone" | "friend" | "date" | "family" | "other";
export type RevisitIntent = "yes" | "maybe" | "no";

export type Review = {
  id: string;
  placeId: string;
  placeName: string;
  date: string;
  companion: Companion;
  note: string;
  revisitIntent: RevisitIntent;
  photos: string[];
};
