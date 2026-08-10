import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/src/components/common/Button";
import { Icon } from "@/src/components/common/Icon";
import { AppShell } from "@/src/components/layout/AppShell";
import { getPlaceById } from "@/src/mocks/places";

const COMPANION_OPTIONS = ["혼자", "친구와", "데이트", "가족"];
const VISIBILITY_OPTIONS = ["전체 공개", "나만 보기"];
const DEFAULT_PLACE_ID = "object-yeonnam";
const MAX_REVIEW_LENGTH = 200;
const MAX_TITLE_LENGTH = 40;

function PageHeader() {
  return (
    <section className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <h1 className="text-4xl font-black">새로운 기록</h1>
        <p className="mt-3 text-base font-semibold text-zinc-500">
          오늘의 장소와 경험을 간단히 남겨보세요.
        </p>
      </div>
      <button
        className="h-11 rounded-lg border border-[var(--border)] px-4 text-sm font-bold interactive"
        type="button"
      >
        임시저장
      </button>
    </section>
  );
}

function PhotoUploadPanel() {
  return (
    <section className="flex min-h-[520px] items-center justify-center rounded-2xl border-2 border-dashed border-[var(--border)] bg-zinc-50 p-8 text-center">
      <button className="flex flex-col items-center gap-4 text-zinc-500" type="button">
        <span className="flex h-16 w-16 items-center justify-center rounded-full border border-[var(--border)] bg-white">
          <Icon className="h-7 w-7" name="plus" />
        </span>
        <span className="text-sm font-bold">사진을 끌어놓거나 클릭해 추가</span>
        <span className="text-xs font-semibold text-zinc-400">최대 10장</span>
      </button>
    </section>
  );
}

function ReadOnlyPlaceField({ place }) {
  return (
    <label className="mt-6 block text-sm font-bold" htmlFor="record-place">
      장소
      <input
        className="mt-2 h-12 w-full rounded-lg border border-[var(--border)] px-4 outline-none focus:border-black"
        id="record-place"
        placeholder="장소를 검색하거나 선택하세요."
        readOnly
        value={place.name}
      />
    </label>
  );
}

function TextField({ label, maxLength, onChange, placeholder, value }) {
  return (
    <label className="mt-5 block text-sm font-bold" htmlFor="record-title">
      {label}
      <input
        className="mt-2 h-12 w-full rounded-lg border border-[var(--border)] px-4 outline-none focus:border-black"
        id="record-title"
        maxLength={maxLength}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        value={value}
      />
    </label>
  );
}

function ReviewTextarea({ onChange, value }) {
  return (
    <label className="mt-5 block text-sm font-bold" htmlFor="record-review">
      경험
      <textarea
        className="mt-2 h-36 w-full resize-none rounded-lg border border-[var(--border)] p-4 outline-none focus:border-black"
        id="record-review"
        maxLength={MAX_REVIEW_LENGTH}
        onChange={(event) => onChange(event.target.value)}
        placeholder="어떤 경험이었나요?"
        value={value}
      />
      <span className="mt-1 block text-right text-xs font-semibold text-zinc-400">
        {value.length}/{MAX_REVIEW_LENGTH}
      </span>
    </label>
  );
}

function OptionGroup({ columns = "grid-cols-2", label, onChange, options, value }) {
  return (
    <div className="mt-6">
      <p className="text-sm font-bold">{label}</p>
      <div className={`mt-3 grid ${columns} gap-2`}>
        {options.map((option) => (
          <button
            className={`h-11 rounded-lg border text-sm font-bold ${
              value === option ? "border-black bg-black text-white" : "border-[var(--border)] bg-white text-zinc-600"
            }`}
            key={option}
            onClick={() => onChange(option)}
            type="button"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

function RecordFormPanel({
  companion,
  onCompanionChange,
  onReviewChange,
  onSubmit,
  onTitleChange,
  onVisibilityChange,
  place,
  review,
  title,
  visibility,
}) {
  return (
    <section className="wire-panel p-6 lg:p-8">
      <h2 className="text-xl font-black">기록 정보</h2>

      <ReadOnlyPlaceField place={place} />
      <TextField
        label="제목"
        maxLength={MAX_TITLE_LENGTH}
        onChange={onTitleChange}
        placeholder="오늘의 기록 제목"
        value={title}
      />
      <ReviewTextarea onChange={onReviewChange} value={review} />
      <OptionGroup
        columns="grid-cols-2 sm:grid-cols-4"
        label="함께한 사람"
        onChange={onCompanionChange}
        options={COMPANION_OPTIONS}
        value={companion}
      />
      <OptionGroup
        label="공개 설정"
        onChange={onVisibilityChange}
        options={VISIBILITY_OPTIONS}
        value={visibility}
      />

      <Button className="mt-8 w-full" onClick={onSubmit}>
        기록 완료
      </Button>
    </section>
  );
}

export function ReviewWriteForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const placeId = searchParams.get("placeId") ?? DEFAULT_PLACE_ID;
  const place = useMemo(() => getPlaceById(placeId), [placeId]);

  const [companion, setCompanion] = useState(COMPANION_OPTIONS[0]);
  const [visibility, setVisibility] = useState(VISIBILITY_OPTIONS[0]);
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");

  const complete = () => {
    if (!title.trim() || !review.trim()) {
      window.alert("제목과 경험 내용을 입력해주세요.");
      return;
    }

    window.alert("기록이 저장되었습니다.");
    navigate("/my");
  };

  return (
    <AppShell>
      <PageHeader />

      <div className="mt-8 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <PhotoUploadPanel />
        <RecordFormPanel
          companion={companion}
          onCompanionChange={setCompanion}
          onReviewChange={setReview}
          onSubmit={complete}
          onTitleChange={setTitle}
          onVisibilityChange={setVisibility}
          place={place}
          review={review}
          title={title}
          visibility={visibility}
        />
      </div>
    </AppShell>
  );
}
