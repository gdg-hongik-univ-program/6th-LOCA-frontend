import Link from "next/link";
import type { Place } from "@/src/types/place";
import { Icon } from "./Icon";
import { TagChip } from "./TagChip";

type PlaceCardProps = {
  place: Place;
  compact?: boolean;
};

export function PlaceCard({ place, compact = false }: PlaceCardProps) {
  return (
    <Link className="card-shadow block overflow-hidden rounded-2xl bg-white transition hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(0,0,0,0.08)]" href={`/place/${place.id}`}>
      <div className={`relative ${compact ? "h-28" : "h-36 md:h-44"}`}>
        <img alt="" className="h-full w-full object-cover" src={place.imageUrl} />
        <span className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-[var(--brand)]">
          <Icon className="h-4 w-4" name="bookmark" />
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-base font-extrabold text-[var(--text)] md:text-lg">{place.name}</h3>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <TagChip compact>{place.categoryLabel}</TagChip>
          {place.tags.slice(0, compact ? 1 : 2).map((tag) => (
            <TagChip compact key={tag}>
              {tag}
            </TagChip>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-zinc-500">
          <span className="flex items-center gap-1 text-[var(--warning)]">
            <Icon className="h-3.5 w-3.5" filled name="star" />
            {place.rating}
          </span>
          <span>({place.reviewCount})</span>
          <span>-</span>
          <span>{place.distance}</span>
        </div>
        {!compact ? <p className="mt-3 line-clamp-2 text-sm leading-6 text-[var(--text-secondary)]">{place.description}</p> : null}
      </div>
    </Link>
  );
}
