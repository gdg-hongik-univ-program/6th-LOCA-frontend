export type PlaceCategory = "cafe" | "food" | "bar" | "culture" | "beauty" | "workshop";

export type Place = {
  id: string;
  name: string;
  category: PlaceCategory;
  categoryLabel: string;
  tags: string[];
  address: string;
  lat: number;
  lng: number;
  rating: number;
  reviewCount: number;
  distance: string;
  description: string;
  imageUrl: string;
  hours: string;
  saved?: boolean;
};
