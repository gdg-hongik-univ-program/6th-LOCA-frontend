import { Button } from "@/src/components/common/Button";
import { TagChip } from "@/src/components/common/TagChip";
import { AppShell } from "@/src/components/layout/AppShell";
import { getCollections } from "@/src/services/collectionService";

const copy = {
  title: "\uc7a5\uc18c \uceec\ub809\uc158",
  description: "Public Place\uc640 Private Place\ub97c \uc870\ud569\ud574 \ub098\ub9cc\uc758 \ucf54\uc2a4\ub97c \ub9cc\ub4e4\uace0 \uacf5\uc720\ud574\ubcf4\uc138\uc694.",
  detail: "\ucf54\uc2a4 \ubcf4\uae30",
  share: "\uacf5\uc720 \ub9c1\ud06c",
};

export default async function CollectionsPage() {
  const collections = await getCollections();

  return (
    <AppShell>
      <div className="w-full md:pl-8">
        <h1 className="text-2xl font-extrabold md:text-3xl">{copy.title}</h1>
        <p className="mt-2 text-sm font-semibold text-zinc-500">{copy.description}</p>
        <section className="mt-6 grid gap-4 md:grid-cols-2">
          {collections.map((collection) => (
            <article className="overflow-hidden rounded-2xl bg-white shadow-[0_10px_28px_rgba(24,24,27,0.08)]" key={collection.id}>
              <img alt="" className="h-44 w-full object-cover" src={collection.coverImageUrl} />
              <div className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-lg font-extrabold">{collection.title}</h2>
                  <TagChip compact>{collection.visibility}</TagChip>
                </div>
                <p className="mt-2 text-sm font-semibold leading-6 text-zinc-500">{collection.description}</p>
                <p className="mt-3 text-xs font-bold text-zinc-400">{collection.placeIds.length} places</p>
                <div className="mt-4 flex gap-2">
                  <Button href={`/collections/${collection.id}`} variant="primary">{copy.detail}</Button>
                  <Button href={`/collections/${collection.shareSlug}`} variant="secondary">{copy.share}</Button>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </AppShell>
  );
}
