import { useState, useEffect } from "react";
import { AppShell } from "@/src/components/layout/AppShell";
import { getTags } from "@/src/services/tagService";
import { AdminTagsClient } from "./AdminTagsClient";

export default function AdminTagsPage() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTags().then((tagsData) => {
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
      <AdminTagsClient initialTags={tags} />
    </AppShell>
  );
}

