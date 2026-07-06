export type Companion = "alone" | "friend" | "date" | "family" | "other";
export type Mood = "happy" | "calm" | "excited" | "inspired" | "lonely" | "stressed";

export type Review = {
  id: string;
  placeId: string;
  placeName: string;
  date: string;
  title: string;
  companion: Companion;
  mood: Mood;
  keywords: string[];
  memory: string;
  review: string;
  satisfaction: number;
  expense: number | null;
  expenseUnknown: boolean;
  atmosphereTags: string[];
  images: string[];
  futureMemo: string;
};
