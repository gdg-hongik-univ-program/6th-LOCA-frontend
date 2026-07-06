import Link from "next/link";
import { PlaceCard } from "@/src/components/common/PlaceCard";
import { TagChip } from "@/src/components/common/TagChip";
import { AppShell } from "@/src/components/layout/AppShell";
import { getCollectionById } from "@/src/services/collectionService";

export default async function CollectionDetailPage({ params }: PageProps<"/collections/[id]">) {
  const { id } = await params;
  const collection = await getCollectionById(id);

  return (
    <AppShell>
      <div className="w-full md:pl-8">
        <Link className="text-sm font-bold text-zinc-500" href="/collections">← Collections</Link>
        <section className="mt-5 overflow-hidden rounded-2xl bg-white shadow-[0_10px_28px_rgba(24,24,27,0.08)]">
          <img alt="" className="h-56 w-full object-cover" src={collection.coverImageUrl} />
          <div className="p-5 md:p-7">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-extrabold md:text-3xl">{collection.title}</h1>
              <TagChip compact>{collection.visibility}</TagChip>
            </div>
            <p className="mt-3 text-sm font-semibold leading-6 text-zinc-500">{collection.description}</p>
            <p className="mt-3 rounded-xl bg-zinc-100 px-4 py-3 text-xs font-bold text-zinc-500">Share URL: /collections/{collection.shareSlug}</p>
          </div>
        </section>
        <section className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {(collection.places ?? []).map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </section>
      </div>
    </AppShell>
  );
}
