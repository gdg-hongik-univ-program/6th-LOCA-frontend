export type PlaceCategory = "cafe" | "food" | "bar" | "culture" | "beauty" | "workshop";
export type PlaceVisibility = "public" | "private";
export type PlaceSource = "kakao" | "user";
export type PlaceRegistrationMethod = "photoGps" | "currentLocation" | "mapSelect" | "manual";

export type Place = {
  id: string;
  kakaoPlaceId?: string;
  visibility: PlaceVisibility;
  source: PlaceSource;
  name: string;
  category: PlaceCategory;
  categoryLabel: string;
  tags: string[];
  address: string;
  lat: number;
  lng: number;
  rating: number;
  averageRating?: number;
  visitCount?: number;
  reviewCount: number;
  distance: string;
  description: string;
  imageUrl: string;
  hours: string;
  createdBy?: string;
  registrationMethod?: PlaceRegistrationMethod;
  saved?: boolean;
};

export type CreatePlacePayload = {
  kakaoPlaceId?: string;
  visibility?: PlaceVisibility;
  source?: PlaceSource;
  registrationMethod?: PlaceRegistrationMethod;
  name: string;
  category: PlaceCategory;
  address: string;
  lat: number;
  lng: number;
  description: string;
  imageUrl: string;
  tagIds: string[];
};

export type UpdatePlacePayload = Partial<CreatePlacePayload>;
