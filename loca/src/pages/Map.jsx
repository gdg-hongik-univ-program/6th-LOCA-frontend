import { useState, useEffect } from "react";
import Link from "next/link";
import { Icon } from "@/src/components/common/Icon";
import { TagChip } from "@/src/components/common/TagChip";
import { AppShell } from "@/src/components/layout/AppShell";
import { KakaoMap } from "@/src/components/map/KakaoMap";
import { getPlaces } from "@/src/services/placeService";
import { getTags } from "@/src/services/tagService";

const copy = {
  search:
    "장소나 동네를 검색해보세요",
  list: "목록으로 보기",
};

export default function MapPage() {
  const [places, setPlaces] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getPlaces(), getTags()]).then(([placesData, tagsData]) => {
      setPlaces(placesData);
      setTags(tagsData);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <AppShell flush>
        <div className="p-5 text-zinc-500">지도를 준비하고 있어요...</div>
      </AppShell>
    );
  }

  const categories = tags
    .slice(0, 5)
    .map((tag) => ({ key: tag.id, label: tag.name }));

  return (
    <AppShell flush>
      <div className="flex h-full w-full flex-col overflow-hidden overscroll-none touch-none">
        <section className="z-10 w-full touch-auto bg-transparent px-5 pb-3 pt-5 md:px-10 md:pt-8">
          <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_12px_30px_rgba(0,0,0,0.08)] md:max-w-2xl">
            <Icon className="h-5 w-5 text-zinc-400" name="search" />
            <span className="flex-1 text-sm font-semibold text-zinc-400">
              {copy.search}
            </span>
            <Link
              aria-label={copy.list}
              className="text-[var(--brand)]"
              href="/explore"
            >
              <Icon name="x" />
            </Link>
          </div>
          <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1">
            {categories.map((category) => (
              <TagChip active={category.key === "all"} key={category.key}>
                {category.label}
              </TagChip>
            ))}
          </div>
        </section>
        <div className="absolute inset-y-0 left-0 right-0 w-auto touch-auto md:left-64">
          <KakaoMap places={places} />
        </div>
      </div>
    </AppShell>
  );
}

