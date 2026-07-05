import type { Review } from "@/src/types/review";

export const mockReviews: Review[] = [
  {
    id: "review-1",
    placeId: "object-yeonnam",
    placeName: "연남동, 오브젝트",
    date: "2024.05.20",
    companion: "alone",
    note: "혼자 머물러도 어색하지 않고 조용해서 좋았어요.",
    revisitIntent: "yes",
    photos: ["https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=400&q=80"],
  },
  {
    id: "review-2",
    placeId: "batiba-hapjeong",
    placeName: "합정동, 바티바",
    date: "2024.05.18",
    companion: "date",
    note: "대화하기 좋은 조도와 음악. 늦은 저녁에 다시 가고 싶어요.",
    revisitIntent: "yes",
    photos: ["https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=400&q=80"],
  },
  {
    id: "review-3",
    placeId: "corner-sangsu",
    placeName: "상수동, 코너식당",
    date: "2024.05.15",
    companion: "friend",
    note: "작은 공간이지만 음식이 따뜻하고 직원분들이 친절했어요.",
    revisitIntent: "maybe",
    photos: ["https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80"],
  },
];
