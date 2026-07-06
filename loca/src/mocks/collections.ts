import type { PlaceCollection } from "@/src/types/collection";
import { mockPlaces } from "./places";

export const mockCollections: PlaceCollection[] = [
  {
    id: "hongdae-date-course",
    title: "\ud64d\ub300 \uac10\uc131 \ub370\uc774\ud2b8 \ucf54\uc2a4",
    description: "\uc870\uc6a9\ud55c \uce74\ud398\uc5d0\uc11c \uc2dc\uc791\ud574 \ubc24 \uc0b0\ucc45\uae4c\uc9c0 \uc774\uc5b4\uc9c0\ub294 \ucf54\uc2a4",
    visibility: "shared",
    shareSlug: "hongdae-date-course",
    placeIds: ["object-yeonnam", "popup-culture", "private-photo-wall", "quiet-bar"],
    places: mockPlaces.filter((place) => ["object-yeonnam", "popup-culture", "private-photo-wall", "quiet-bar"].includes(place.id)),
    coverImageUrl: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=900&q=80",
    createdAt: "2026-07-06",
  },
  {
    id: "solo-healing-walk",
    title: "\ud63c\uc790 \ud790\ub9c1 \uc0b0\ucc45 \ucf54\uc2a4",
    description: "\uc0ac\ub78c \uc801\uc740 \uae38\uacfc \uc791\uc740 \uc26c\ub294 \uc7a5\uc18c\ub97c \ubb36\uc740 \uceec\ub809\uc158",
    visibility: "private",
    shareSlug: "solo-healing-walk",
    placeIds: ["private-bench-gyeongui", "leather-gyeongui", "corner-sangsu"],
    places: mockPlaces.filter((place) => ["private-bench-gyeongui", "leather-gyeongui", "corner-sangsu"].includes(place.id)),
    coverImageUrl: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=900&q=80",
    createdAt: "2026-07-06",
  },
];
