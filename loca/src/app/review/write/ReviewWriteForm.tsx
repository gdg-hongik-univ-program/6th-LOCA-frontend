"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Button } from "@/src/components/common/Button";
import { Icon } from "@/src/components/common/Icon";
import { getPlaceById } from "@/src/mocks/places";

const companions = [
  { key: "alone", label: "혼자", icon: "user" },
  { key: "friend", label: "친구", icon: "users" },
  { key: "date", label: "연인", icon: "heart" },
  { key: "family", label: "가족", icon: "users" },
  { key: "other", label: "기타", icon: "users" },
] as const;

const revisitOptions = [
  { key: "yes", label: "네" },
  { key: "maybe", label: "보통" },
  { key: "no", label: "아니요" },
] as const;

export function ReviewWriteForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const placeId = searchParams.get("placeId") ?? "object-yeonnam";
  const place = useMemo(() => getPlaceById(placeId), [placeId]);
  const [companion, setCompanion] = useState<(typeof companions)[number]["key"]>("alone");
  const [revisitIntent, setRevisitIntent] = useState<(typeof revisitOptions)[number]["key"]>("yes");
  const [note, setNote] = useState("");

  const complete = () => {
    console.log("mock review submitted", {
      placeId: place.id,
      companion,
      revisitIntent,
      note,
    });
    window.alert("기록이 임시로 완료되었어요.");
    router.push("/my");
  };

  return (
    <div className="min-h-dvh bg-white px-5 pb-8 pt-5">
      <header className="flex items-center justify-between">
        <button aria-label="닫기" className="rounded-full p-2 text-zinc-500" onClick={() => router.back()} type="button">
          <Icon name="x" />
        </button>
        <h1 className="text-base font-extrabold">기록하기</h1>
        <button className="px-2 text-sm font-extrabold text-[var(--brand)]" onClick={complete} type="button">
          완료
        </button>
      </header>

      <p className="mt-8 text-sm font-bold text-zinc-500">선택한 장소</p>
      <div className="mt-3 flex items-center gap-3 rounded-2xl border border-[var(--border)] p-3">
        <img alt="" className="h-14 w-14 rounded-xl object-cover" src={place.imageUrl} />
        <div>
          <h2 className="text-sm font-extrabold">{place.name}</h2>
          <p className="mt-1 text-xs font-semibold text-zinc-500">{place.categoryLabel}</p>
        </div>
      </div>

      <section className="mt-7">
        <h2 className="text-sm font-extrabold">누구와 다녀왔나요?</h2>
        <div className="mt-4 grid grid-cols-5 gap-2">
          {companions.map((item) => (
            <button
              className="flex flex-col items-center gap-2 text-[11px] font-semibold text-zinc-500"
              key={item.key}
              onClick={() => setCompanion(item.key)}
              type="button"
            >
              <span className={`flex h-12 w-12 items-center justify-center rounded-full ${companion === item.key ? "border border-[var(--brand)] bg-[#eef5ee] text-[var(--brand)]" : "bg-zinc-100 text-zinc-400"}`}>
                <Icon className="h-5 w-5" name={item.icon} />
              </span>
              {item.label}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-sm font-extrabold">어떤 점이 좋았나요?</h2>
        <div className="mt-4 rounded-xl border border-[var(--border)] p-4">
          <textarea
            className="h-24 w-full resize-none border-0 text-sm outline-none placeholder:text-zinc-300"
            maxLength={200}
            onChange={(event) => setNote(event.target.value)}
            placeholder="좋았던 점을 자유롭게 남겨보세요."
            value={note}
          />
          <div className="text-right text-xs font-semibold text-zinc-300">{note.length} / 200</div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-sm font-extrabold">다시 방문하고 싶나요?</h2>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {revisitOptions.map((item) => (
            <button
              className={`h-12 rounded-xl text-sm font-bold ${
                revisitIntent === item.key ? "border border-[var(--brand)] bg-[#eef5ee] text-[var(--brand)]" : "bg-zinc-100 text-zinc-500"
              }`}
              key={item.key}
              onClick={() => setRevisitIntent(item.key)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-sm font-extrabold">사진 추가</h2>
        <div className="mt-4 flex gap-3">
          <button className="flex h-20 w-20 items-center justify-center rounded-xl bg-zinc-100 text-zinc-600" type="button">
            <Icon className="h-7 w-7" name="plus" />
          </button>
          {[place.imageUrl, "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=300&q=80"].map((src) => (
            <div className="relative h-20 w-20 overflow-hidden rounded-xl" key={src}>
              <img alt="" className="h-full w-full object-cover" src={src} />
              <span className="absolute right-1 top-1 rounded-full bg-black/50 p-0.5 text-white">
                <Icon className="h-3 w-3" name="x" />
              </span>
            </div>
          ))}
        </div>
      </section>

      <Button className="mt-9 w-full" onClick={complete}>
        완료
      </Button>
    </div>
  );
}
