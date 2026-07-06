import type { Place } from "./place";

export type PlaceCollection = {
  id: string;
  title: string;
  description: string;
  visibility: "private" | "shared" | "public";
  shareSlug: string;
  placeIds: string[];
  places?: Place[];
  coverImageUrl: string;
  createdAt: string;
};

export type CreateCollectionPayload = {
  title: string;
  description: string;
  visibility: "private" | "shared" | "public";
  placeIds: string[];
};
