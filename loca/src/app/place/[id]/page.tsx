import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/src/components/common/Button";
import { Icon } from "@/src/components/common/Icon";
import { TagChip } from "@/src/components/common/TagChip";
import { AppShell } from "@/src/components/layout/AppShell";
import { getPlaceById, mockPlaces } from "@/src/mocks/places";

export function generateStaticParams() {
  return mockPlaces.map((place) => ({ id: place.id }));
}

export default async function PlaceDetailPage({ params }: PageProps<"/place/[id]">) {
  const { id } = await params;
  const place = getPlaceById(id);

  if (!place) {
    notFound();
  }

  return (
    <AppShell flush>
      <section className="relative h-80 overflow-hidden">
        <img alt="" className="h-full w-full object-cover" src={place.imageUrl} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/10" />
        <div className="absolute inset-x-0 top-4 flex items-center justify-between px-4 text-white">
          <Link aria-label="뒤로가기" className="rounded-full bg-black/20 p-2 backdrop-blur" href="/explore">
            <Icon name="chevron" />
          </Link>
          <div className="flex gap-2">
            <button aria-label="공유" className="rounded-full bg-black/20 p-2 backdrop-blur" type="button">
              <Icon name="share" />
            </button>
            <button aria-label="북마크" className="rounded-full bg-black/20 p-2 backdrop-blur" type="button">
              <Icon name="bookmark" />
            </button>
          </div>
        </div>
      </section>

      <section className="-mt-8 rounded-t-[28px] bg-white px-5 pb-28 pt-7">
        <h1 className="text-2xl font-extrabold">{place.name}</h1>
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
          <span>·</span>
          <span>{place.distance}</span>
        </div>
        <p className="mt-5 text-sm leading-7 text-[var(--text-secondary)]">{place.description}</p>

        <div className="mt-7 divide-y divide-[var(--border)] rounded-2xl border border-[var(--border)] bg-white">
          <div className="flex items-start gap-3 p-4">
            <Icon className="mt-0.5 h-5 w-5 text-zinc-500" name="mapPin" />
            <div>
              <p className="text-sm font-bold">위치</p>
              <p className="mt-1 text-sm text-zinc-500">{place.address}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4">
            <Icon className="mt-0.5 h-5 w-5 text-zinc-500" name="clock" />
            <div>
              <p className="text-sm font-bold">영업시간</p>
              <p className="mt-1 text-sm text-zinc-500">{place.hours}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="absolute inset-x-0 bottom-[78px] z-10 bg-white px-5 py-3">
        <Button className="w-full" href={`/review/write?placeId=${place.id}`}>
          기록하기
        </Button>
      </div>
    </AppShell>
  );
}
