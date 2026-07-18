import { apiClient } from "@/src/lib/apiClient";
import { mockCollections } from "@/src/mocks/collections";

export async function getCollections() {
  try {
    return await apiClient("/api/collections", { fallback: mockCollections });
  } catch {
    return mockCollections;
  }
}

export async function getCollectionById(collectionId) {
  const fallback =
    mockCollections.find(
      (collection) =>
        collection.id === collectionId || collection.shareSlug === collectionId,
    ) ?? mockCollections[0];

  try {
    return await apiClient(`/api/collections/${collectionId}`, { fallback });
  } catch {
    return fallback;
  }
}

export async function createCollection(payload) {
  return apiClient("/api/collections", {
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
