import Link from "next/link";
import { AppShell } from "@/src/components/layout/AppShell";
import { getPlaces } from "@/src/services/placeService";
import { getTags } from "@/src/services/tagService";

const copy = {
  title: "Admin Dashboard",
  places: "\uc7a5\uc18c \uad00\ub9ac",
  tags: "\ud0dc\uadf8 \uad00\ub9ac",
  placeCount: "\ub4f1\ub85d\ub41c \uc7a5\uc18c",
  tagCount: "\ub4f1\ub85d\ub41c \ud0dc\uadf8",
};

export default async function AdminPage() {
  const [places, tags] = await Promise.all([getPlaces(), getTags()]);

  return (
    <AppShell>
      <div className="w-full md:pl-8">
        <h1 className="text-2xl font-extrabold md:text-3xl">{copy.title}</h1>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Link className="rounded-2xl bg-white p-6 shadow-[0_10px_28px_rgba(24,24,27,0.08)]" href="/admin/places">
            <p className="text-lg font-extrabold">{copy.places}</p>
            <p className="mt-4 text-sm font-semibold text-zinc-500">{copy.placeCount}</p>
            <p className="mt-2 text-3xl font-extrabold">{places.length}</p>
          </Link>
          <Link className="rounded-2xl bg-white p-6 shadow-[0_10px_28px_rgba(24,24,27,0.08)]" href="/admin/tags">
            <p className="text-lg font-extrabold">{copy.tags}</p>
            <p className="mt-4 text-sm font-semibold text-zinc-500">{copy.tagCount}</p>
            <p className="mt-2 text-3xl font-extrabold">{tags.length}</p>
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
