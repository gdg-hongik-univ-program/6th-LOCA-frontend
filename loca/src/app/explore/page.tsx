import Link from "next/link";
import { Icon } from "@/src/components/common/Icon";
import { PlaceCard } from "@/src/components/common/PlaceCard";
import { SegmentTabs } from "@/src/components/common/SegmentTabs";
import { TagChip } from "@/src/components/common/TagChip";
import { AppShell } from "@/src/components/layout/AppShell";
import { categories, mockPlaces } from "@/src/mocks/places";

export default function ExplorePage() {
  return (
    <AppShell flush>
      <SegmentTabs active="explore" />
      <section className="px-5 pt-6">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-extrabold">새로운 로컬 탐색</h1>
          <Link aria-label="지도에서 보기" className="rounded-full p-2 text-zinc-500" href="/map">
            <Icon name="sliders" />
          </Link>
        </div>
        <div className="no-scrollbar mt-5 flex gap-2 overflow-x-auto pb-1">
          {categories.map((category) => (
            <TagChip active={category.key === "all"} key={category.key}>
              {category.label}
            </TagChip>
          ))}
        </div>
        <div className="mt-5 space-y-4">
          {mockPlaces.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      </section>
    </AppShell>
  );
}
