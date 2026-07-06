import Link from "next/link";
import { Icon } from "@/src/components/common/Icon";
import { PlaceCard } from "@/src/components/common/PlaceCard";
import { SegmentTabs } from "@/src/components/common/SegmentTabs";
import { TagChip } from "@/src/components/common/TagChip";
import { AppShell } from "@/src/components/layout/AppShell";
import { getPlaces } from "@/src/services/placeService";
import { getTags } from "@/src/services/tagService";

const copy = {
  title: "\uc0c8\ub85c\uc6b4 \ub85c\uceec \ud0d0\uc0c9",
  description: "\uce74\ud398, \ub9db\uc9d1, \uc220\uc9d1, \ubb38\ud654 \uacf5\uac04\uc744 \ud55c\ub208\uc5d0 \ub458\ub7ec\ubcf4\uc138\uc694.",
  map: "\uc9c0\ub3c4\uc5d0\uc11c \ubcf4\uae30",
};

export default async function ExplorePage() {
  const [places, tags] = await Promise.all([getPlaces(), getTags()]);
  const categories = tags.slice(0, 5).map((tag) => ({ key: tag.id, label: tag.name }));

  return (
    <AppShell flush>
      <SegmentTabs active="explore" />
      <section className="px-5 pt-6 md:px-10 md:pt-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-extrabold md:text-3xl">{copy.title}</h1>
            <p className="mt-2 hidden text-sm font-semibold text-zinc-500 md:block">{copy.description}</p>
          </div>
          <Link aria-label={copy.map} className="rounded-full p-2 text-zinc-500 md:flex md:h-11 md:items-center md:gap-2 md:rounded-xl md:border md:border-[var(--border)] md:bg-white md:px-4 md:text-sm md:font-bold" href="/map">
            <Icon name="sliders" />
            <span className="hidden md:inline">{copy.map}</span>
          </Link>
        </div>
        <div className="no-scrollbar mt-5 flex gap-2 overflow-x-auto pb-1">
          {categories.map((category) => (
            <TagChip active={category.key === "all"} key={category.key}>
              {category.label}
            </TagChip>
          ))}
        </div>
        <div className="mt-5 space-y-4 md:grid md:grid-cols-2 md:gap-5 md:space-y-0 lg:grid-cols-3">
          {places.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      </section>
    </AppShell>
  );
}
