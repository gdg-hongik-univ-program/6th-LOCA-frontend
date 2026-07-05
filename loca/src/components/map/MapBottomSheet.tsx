import Link from "next/link";
import type { Place } from "@/src/types/place";
import { Button } from "@/src/components/common/Button";
import { Icon } from "@/src/components/common/Icon";
import { TagChip } from "@/src/components/common/TagChip";

type MapBottomSheetProps = {
  place: Place;
};

export function MapBottomSheet({ place }: MapBottomSheetProps) {
  return (
    <aside className="absolute inset-x-4 bottom-24 z-10 rounded-2xl bg-white p-4 shadow-[0_18px_50px_rgba(0,0,0,0.16)]">
      <div className="flex gap-3">
        <img alt="" className="h-20 w-20 rounded-xl object-cover" src={place.imageUrl} />
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-base font-extrabold">{place.name}</h2>
          <div className="mt-2 flex flex-wrap gap-1">
            <TagChip compact>{place.categoryLabel}</TagChip>
            {place.tags.slice(0, 2).map((tag) => (
              <TagChip compact key={tag}>
                {tag}
              </TagChip>
            ))}
          </div>
          <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-zinc-500">
            <Icon className="h-3.5 w-3.5 text-[var(--warning)]" filled name="star" />
            {place.rating} · {place.distance}
          </div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Button href={`/place/${place.id}`} variant="secondary">
          상세보기
        </Button>
        <Link
          className="inline-flex h-12 items-center justify-center rounded-xl bg-[var(--brand)] text-sm font-semibold text-white"
          href={`/review/write?placeId=${place.id}`}
        >
          기록하기
        </Link>
      </div>
    </aside>
  );
}
