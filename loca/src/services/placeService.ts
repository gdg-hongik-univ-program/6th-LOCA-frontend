import { apiClient } from "@/src/lib/apiClient";
import { mockPlaces } from "@/src/mocks/places";
import type { CreatePlacePayload, Place, UpdatePlacePayload } from "@/src/types/place";

export async function getPlaces(): Promise<Place[]> {
  try {
    return await apiClient<Place[]>("/api/places", { fallback: mockPlaces });
  } catch {
    return mockPlaces;
  }
}

export async function getPlaceById(placeId: string): Promise<Place> {
  const fallback = mockPlaces.find((place) => place.id === placeId) ?? mockPlaces[0];

  try {
    return await apiClient<Place>(`/api/places/${placeId}`, { fallback });
  } catch {
    return fallback;
  }
}

export async function createPlace(payload: CreatePlacePayload): Promise<Place> {
  return apiClient<Place>("/api/admin/places", {
    method: "POST",
    body: JSON.stringify(payload),
    fallback: {
      ...mockPlaces[0],
      ...payload,
      id: `mock-${Date.now()}`,
      visibility: payload.visibility ?? "private",
      source: payload.source ?? "user",
      categoryLabel: payload.category,
      tags: payload.tagIds,
      rating: 0,
      reviewCount: 0,
      distance: "-",
      hours: "-",
    },
  });
}

export async function updatePlace(placeId: string, payload: UpdatePlacePayload): Promise<Place> {
  const fallback = mockPlaces.find((place) => place.id === placeId) ?? mockPlaces[0];

  return apiClient<Place>(`/api/admin/places/${placeId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
    fallback: { ...fallback, ...payload },
  });
}

export async function deletePlace(placeId: string): Promise<void> {
  await apiClient<void>(`/api/admin/places/${placeId}`, {
    method: "DELETE",
    fallback: undefined,
  });
}
