import { AppShell } from "@/src/components/layout/AppShell";
import { getTags } from "@/src/services/tagService";
import { AdminTagsClient } from "./AdminTagsClient";

export default async function AdminTagsPage() {
  const tags = await getTags();

  return (
    <AppShell>
      <AdminTagsClient initialTags={tags} />
    </AppShell>
  );
}
