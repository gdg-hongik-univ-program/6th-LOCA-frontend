import { apiClient } from "@/src/lib/apiClient";
import { mockCollections } from "@/src/mocks/collections";
import type { CreateCollectionPayload, PlaceCollection } from "@/src/types/collection";

export async function getCollections(): Promise<PlaceCollection[]> {
  try {
    return await apiClient<PlaceCollection[]>("/api/collections", { fallback: mockCollections });
  } catch {
    return mockCollections;
  }
}

export async function getCollectionById(collectionId: string): Promise<PlaceCollection> {
  const fallback = mockCollections.find((collection) => collection.id === collectionId || collection.shareSlug === collectionId) ?? mockCollections[0];

  try {
    return await apiClient<PlaceCollection>(`/api/collections/${collectionId}`, { fallback });
  } catch {
    return fallback;
  }
}

export async function createCollection(payload: CreateCollectionPayload): Promise<PlaceCollection> {
  return apiClient<PlaceCollection>("/api/collections", {
    method: "POST",
    body: JSON.stringify(payload),
    fallback: {
      id: `mock-collection-${Date.now()}`,
      shareSlug: `mock-collection-${Date.now()}`,
      coverImageUrl: "",
      createdAt: new Date().toISOString(),
      ...payload,
    },
  });
}
