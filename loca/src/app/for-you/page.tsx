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
      <section className="px-5 pt-6">
        <h1 className="text-lg font-extrabold">진우님을 위한 추천</h1>
        {isUnlocked ? (
          <div className="mt-5 space-y-4">
            {mockPlaces.slice(0, 4).map((place) => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        ) : (
          <div className="mt-5">
            <ProgressCard current={mockReviews.length} target={10} />
            <div className="mt-6 space-y-4">
              {mockPlaces.slice(0, 2).map((place) => (
                <PlaceCard key={place.id} place={place} />
              ))}
            </div>
          </div>
        )}
      </section>
    </AppShell>
  );
}
