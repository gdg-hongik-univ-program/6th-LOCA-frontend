import { apiClient } from "@/src/lib/apiClient";
import { mockTags } from "@/src/mocks/places";

export async function getTags() {
  try {
    return await apiClient("/api/tags", { fallback: mockTags });
  } catch {
    return mockTags;
  }
}

export async function createTag(payload) {
  return apiClient("/api/admin/tags", {
    method: "POST",
    body: JSON.stringify(payload),
    fallback: { id: `mock-tag-${Date.now()}`, name: payload.name },
  });
}

export async function deleteTag(tagId) {
  await apiClient(`/api/admin/tags/${tagId}`, {
    method: "DELETE",
    fallback: undefined,
  });
}
