import { AppShell } from "@/src/components/layout/AppShell";
import { getPlaces } from "@/src/services/placeService";
import { getTags } from "@/src/services/tagService";
import { AdminPlacesClient } from "./AdminPlacesClient";

export default async function AdminPlacesPage() {
  const [places, tags] = await Promise.all([getPlaces(), getTags()]);

  return (
    <AppShell>
      <AdminPlacesClient initialPlaces={places} tags={tags} />
    </AppShell>
  );
}
