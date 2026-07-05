import { PlaceCard } from "@/src/components/common/PlaceCard";
import { ProgressCard } from "@/src/components/common/ProgressCard";
import { SegmentTabs } from "@/src/components/common/SegmentTabs";
import { AppShell } from "@/src/components/layout/AppShell";
import { mockPlaces } from "@/src/mocks/places";
import { mockReviews } from "@/src/mocks/reviews";

export default function ForYouPage() {
  const isUnlocked = mockReviews.length >= 10;

  return (
    <AppShell flush>
      <SegmentTabs active="for-you" />
      <section className="px-5 pt-6 md:px-10 md:pt-8">
        <div>
          <h1 className="text-lg font-extrabold md:text-3xl">진우님을 위한 추천</h1>
          <p className="mt-2 hidden text-sm font-semibold text-zinc-500 md:block">기록을 바탕으로 취향에 맞는 장소를 골라 보여드려요.</p>
        </div>
        {isUnlocked ? (
          <div className="mt-5 space-y-4 md:grid md:grid-cols-2 md:gap-5 md:space-y-0 lg:grid-cols-3">
            {mockPlaces.slice(0, 4).map((place) => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        ) : (
          <div className="mt-5 md:grid md:grid-cols-[360px_1fr] md:gap-6">
            <ProgressCard current={mockReviews.length} target={10} />
            <div className="mt-6 space-y-4 md:mt-0 md:grid md:grid-cols-2 md:gap-5 md:space-y-0">
              {mockPlaces.slice(0, 4).map((place) => (
                <PlaceCard key={place.id} place={place} />
              ))}
            </div>
          </div>
        )}
      </section>
    </AppShell>
  );
}
