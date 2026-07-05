import { Icon } from "@/src/components/common/Icon";
import { StatItem } from "@/src/components/common/StatItem";
import { TagChip } from "@/src/components/common/TagChip";
import { AppShell } from "@/src/components/layout/AppShell";
import { mockPlaces } from "@/src/mocks/places";
import { mockReviews } from "@/src/mocks/reviews";
import { mockUser } from "@/src/mocks/user";

export default function MyPage() {
  const recordedPlaces = mockReviews.map((review) => mockPlaces.find((place) => place.id === review.placeId)).filter(Boolean);

  return (
    <AppShell>
      <header className="flex justify-end gap-2">
        <button aria-label="알림" className="rounded-full p-2 text-zinc-500" type="button">
          <Icon name="bell" />
        </button>
        <button aria-label="설정" className="rounded-full p-2 text-zinc-500" type="button">
          <Icon name="settings" />
        </button>
      </header>

      <section className="mt-5 flex items-center gap-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#eef5ee] text-[var(--brand)]">
          <Icon className="h-10 w-10" name="user" />
        </div>
        <div>
          <h1 className="text-xl font-extrabold">{mockUser.name}</h1>
          <p className="mt-1 text-sm font-semibold text-zinc-500">{mockUser.title}</p>
        </div>
      </section>

      <section className="mt-8 flex rounded-2xl bg-white p-4">
        <StatItem label="기록한 장소" value={mockUser.recordedPlaceCount} />
        <StatItem label="저장한 장소" value={mockUser.savedPlaceCount} />
        <StatItem label="방문한 동네" value={mockUser.visitedNeighborhoodCount} />
      </section>

      <section className="-mx-5 mt-8 border-b border-[var(--border)] border-t border-[var(--border)] bg-white">
        <div className="grid grid-cols-3 text-center text-sm font-bold">
          <span className="border-b-2 border-[var(--brand)] py-4 text-[var(--text)]">기록</span>
          <span className="py-4 text-zinc-400">저장</span>
          <span className="py-4 text-zinc-400">방문</span>
        </div>
      </section>

      <section className="mt-5 space-y-5">
        {recordedPlaces.map((place, index) =>
          place ? (
            <article className="flex gap-3" key={place.id}>
              <img alt="" className="h-20 w-20 rounded-xl object-cover" src={place.imageUrl} />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="truncate text-sm font-extrabold">{place.name}</h2>
                  <Icon className="h-5 w-5 shrink-0 text-zinc-500" name="bookmark" />
                </div>
                <div className="mt-2 flex gap-1">
                  <TagChip compact>{place.categoryLabel}</TagChip>
                  <TagChip compact>{place.tags[0]}</TagChip>
                </div>
                <p className="mt-2 text-xs font-semibold text-zinc-400">{mockReviews[index]?.date}</p>
              </div>
            </article>
          ) : null,
        )}
      </section>
    </AppShell>
  );
}
