import { apiClient } from "@/src/lib/apiClient";
import { mockPlaces } from "@/src/mocks/places";

export async function getPlaces() {
  try {
    return await apiClient("/api/places", { fallback: mockPlaces });
  } catch {
    return mockPlaces;
  }
}

export async function getPlaceById(placeId) {
  const fallback =
    mockPlaces.find((place) => place.id === placeId) ?? mockPlaces[0];

  try {
    return await apiClient(`/api/places/${placeId}`, { fallback });
  } catch {
    return fallback;
  }
}

export async function createPlace(payload) {
  return apiClient("/api/admin/places", {
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

export async function updatePlace(placeId, payload) {
  const fallback =
    mockPlaces.find((place) => place.id === placeId) ?? mockPlaces[0];

  return apiClient(`/api/admin/places/${placeId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
    fallback: { ...fallback, ...payload },
  });
}

export async function deletePlace(placeId) {
  await apiClient(`/api/admin/places/${placeId}`, {
    method: "DELETE",
    fallback: undefined,
  });
}
