import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/src/components/common/Button";
import { Icon } from "@/src/components/common/Icon";
import { TagChip } from "@/src/components/common/TagChip";
import { AppShell } from "@/src/components/layout/AppShell";
import { mockPlaces } from "@/src/mocks/places";
import { getPlaceById } from "@/src/services/placeService";

const copy = {
  back: "\ub4a4\ub85c\uac00\uae30",
  share: "\uacf5\uc720",
  bookmark: "\ubd81\ub9c8\ud06c",
  location: "\uc704\uce58",
  hours: "\uc601\uc5c5\uc2dc\uac04",
  record: "\uae30\ub85d\ud558\uae30",
};

export function generateStaticParams() {
  return mockPlaces.map((place) => ({ id: place.id }));
}

export default async function PlaceDetailPage({
  params,
}: PageProps<"/place/[id]">) {
  const { id } = await params;
  const place = await getPlaceById(id);

  if (!place) {
    notFound();
  }

  return (
    <AppShell flush>
      <div className="md:grid md:min-h-[calc(100dvh-56px)] md:grid-cols-[1fr_430px]">
        <section className="relative h-80 overflow-hidden md:h-auto">
          <img
            alt=""
            className="h-full w-full object-cover"
            src={place.imageUrl}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/10" />
          <div className="absolute inset-x-0 top-4 flex items-center justify-between px-4 text-white md:px-8 md:top-8">
            <Link
              aria-label={copy.back}
              className="rounded-full bg-black/20 p-2 backdrop-blur"
              href="/explore">
              <Icon name="chevron" />
            </Link>
            <div className="flex gap-2">
              <button
                aria-label={copy.share}
                className="rounded-full bg-black/20 p-2 backdrop-blur"
                type="button">
                <Icon name="share" />
              </button>
              <button
                aria-label={copy.bookmark}
                className="rounded-full bg-black/20 p-2 backdrop-blur"
                type="button">
                <Icon name="bookmark" />
              </button>
            </div>
          </div>
        </section>

        <section className="-mt-0 rounded-t-[28px] bg-white px-5 pb-28 pt-7 md:mt-0 md:rounded-none md:px-8 md:py-10">
          <h1 className="text-2xl font-extrabold md:text-3xl">{place.name}</h1>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <TagChip compact>{place.categoryLabel}</TagChip>
            {place.tags.map((tag) => (
              <TagChip compact key={tag}>
                {tag}
              </TagChip>
            ))}
          </div>
          <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-zinc-500">
            <span className="flex items-center gap-1 text-[var(--warning)]">
              <Icon className="h-4 w-4" filled name="star" />
              {place.rating}
            </span>
            <span>({place.reviewCount})</span>
            <span>-</span>
            <span>{place.distance}</span>
          </div>
          <p className="mt-5 text-sm leading-7 text-[var(--text-secondary)] md:text-base">
            {place.description}
          </p>

          <div className="mt-7 divide-y divide-[var(--border)] rounded-2xl border border-[var(--border)] bg-white">
            <div className="flex items-start gap-3 p-4">
              <Icon className="mt-0.5 h-5 w-5 text-zinc-500" name="mapPin" />
              <div>
                <p className="text-sm font-bold">{copy.location}</p>
                <p className="mt-1 text-sm text-zinc-500">{place.address}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4">
              <Icon className="mt-0.5 h-5 w-5 text-zinc-500" name="clock" />
              <div>
                <p className="text-sm font-bold">{copy.hours}</p>
                <p className="mt-1 text-sm text-zinc-500">{place.hours}</p>
              </div>
            </div>
          </div>

          <Button
            className="mt-8 hidden w-full md:inline-flex !text-white [&>*]:!text-white"
            href={`/review/write?placeId=${place.id}`}>
            {copy.record}
          </Button>
        </section>
      </div>
    </AppShell>
  );
}
