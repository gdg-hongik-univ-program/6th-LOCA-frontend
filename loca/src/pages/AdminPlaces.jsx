import { useState, useEffect } from "react";
import { AppShell } from "@/src/components/layout/AppShell";
import { getPlaces } from "@/src/services/placeService";
import { getTags } from "@/src/services/tagService";
import { AdminPlacesClient } from "./AdminPlacesClient";

export default function AdminPlacesPage() {
  const [places, setPlaces] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getPlaces(), getTags()]).then(([placesData, tagsData]) => {
      setPlaces(placesData);
      setTags(tagsData);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <AppShell>
        <div className="w-full md:pl-8 py-10 text-zinc-500">불러오는 중...</div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <AdminPlacesClient initialPlaces={places} tags={tags} />
    </AppShell>
  );
}

