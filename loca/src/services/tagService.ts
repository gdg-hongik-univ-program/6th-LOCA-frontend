import { apiClient } from "@/src/lib/apiClient";
import { mockTags } from "@/src/mocks/places";
import type { CreateTagPayload, Tag } from "@/src/types/tag";

export async function getTags(): Promise<Tag[]> {
  try {
    return await apiClient<Tag[]>("/api/tags", { fallback: mockTags });
  } catch {
    return mockTags;
  }
}

export async function createTag(payload: CreateTagPayload): Promise<Tag> {
  return apiClient<Tag>("/api/admin/tags", {
    method: "POST",
    body: JSON.stringify(payload),
    fallback: { id: `mock-tag-${Date.now()}`, name: payload.name },
  });
}

export async function deleteTag(tagId: string): Promise<void> {
  await apiClient<void>(`/api/admin/tags/${tagId}`, {
    method: "DELETE",
    fallback: undefined,
  });
}
