import { useState } from "react";
import { Button } from "@/src/components/common/Button";
import { TagChip } from "@/src/components/common/TagChip";
import { createPlace, deletePlace, updatePlace } from "@/src/services/placeService";

const EMPTY_FORM = {
  kakaoPlaceId: "",
  name: "",
  category: "cafe",
  address: "",
  lat: 37.5563,
  lng: 126.9236,
  description: "",
  imageUrl: "",
  tagIds: [],
};

const CATEGORY_OPTIONS = ["cafe", "food", "bar", "culture", "beauty", "workshop"];

function getErrorMessage(error) {
  return error instanceof Error ? error.message : "요청 처리 중 문제가 발생했습니다.";
}

function Field({ className = "", onChange, placeholder, type = "text", value }) {
  return (
    <input
      className={`h-11 rounded-xl border border-[var(--border)] px-3 text-sm ${className}`}
      onChange={(event) => onChange(type === "number" ? Number(event.target.value) : event.target.value)}
      placeholder={placeholder}
      type={type}
      value={value}
    />
  );
}

function Message({ children }) {
  if (!children) return null;

  return (
    <p className="mt-3 rounded-xl bg-zinc-100 px-4 py-3 text-sm font-bold text-zinc-600">
      {children}
    </p>
  );
}

function PlaceForm({ editingId, form, onCancel, onChange, onSubmit, tags }) {
  const selectedTags = form.tagIds;

  const toggleTag = (tagName) => {
    onChange({
      ...form,
      tagIds: selectedTags.includes(tagName)
        ? selectedTags.filter((name) => name !== tagName)
        : [...selectedTags, tagName],
    });
  };

  return (
    <section className="mt-5 rounded-2xl bg-white p-5 shadow-[0_10px_28px_rgba(24,24,27,0.08)]">
      <div className="grid gap-3 md:grid-cols-2">
        <Field
          onChange={(value) => onChange({ ...form, kakaoPlaceId: value })}
          placeholder="kakaoPlaceId"
          value={form.kakaoPlaceId}
        />
        <Field
          onChange={(value) => onChange({ ...form, name: value })}
          placeholder="장소 이름"
          value={form.name}
        />
        <select
          className="h-11 rounded-xl border border-[var(--border)] px-3 text-sm"
          onChange={(event) => onChange({ ...form, category: event.target.value })}
          value={form.category}
        >
          {CATEGORY_OPTIONS.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <Field
          onChange={(value) => onChange({ ...form, address: value })}
          placeholder="주소"
          value={form.address}
        />
        <Field
          onChange={(value) => onChange({ ...form, lat: value })}
          placeholder="위도"
          type="number"
          value={form.lat}
        />
        <Field
          onChange={(value) => onChange({ ...form, lng: value })}
          placeholder="경도"
          type="number"
          value={form.lng}
        />
        <Field
          className="md:col-span-2"
          onChange={(value) => onChange({ ...form, imageUrl: value })}
          placeholder="이미지 URL"
          value={form.imageUrl}
        />
        <textarea
          className="h-24 rounded-xl border border-[var(--border)] p-3 text-sm md:col-span-2"
          onChange={(event) => onChange({ ...form, description: event.target.value })}
          placeholder="장소 설명"
          value={form.description}
        />
      </div>

      <TagSelector selectedTags={selectedTags} tags={tags} onToggle={toggleTag} />

      <div className="mt-4 flex gap-2">
        <Button onClick={onSubmit}>{editingId ? "수정 완료" : "등록"}</Button>
        {editingId ? (
          <Button onClick={onCancel} variant="secondary">
            취소
          </Button>
        ) : null}
      </div>
    </section>
  );
}

function TagSelector({ onToggle, selectedTags, tags }) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <button
          className={`rounded-full px-3 py-2 text-xs font-bold ${
            selectedTags.includes(tag.name) ? "bg-[var(--brand)] text-white" : "bg-zinc-100 text-zinc-500"
          }`}
          key={tag.id}
          onClick={() => onToggle(tag.name)}
          type="button"
        >
          {tag.name}
        </button>
      ))}
    </div>
  );
}

function PlaceList({ onEdit, onRemove, places }) {
  return (
    <section className="mt-5 space-y-3">
      {places.map((place) => (
        <PlaceListItem key={place.id} onEdit={onEdit} onRemove={onRemove} place={place} />
      ))}
    </section>
  );
}

function PlaceListItem({ onEdit, onRemove, place }) {
  const tags = place.tags ?? [];

  return (
    <article className="rounded-2xl bg-white p-4 shadow-[0_10px_28px_rgba(24,24,27,0.08)]">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-extrabold">{place.name}</h2>
          <p className="mt-1 text-sm font-semibold text-zinc-500">
            {place.categoryLabel ?? place.category} · {place.address}
          </p>
          <div className="mt-2 flex flex-wrap gap-1">
            {tags.map((tag) => (
              <TagChip compact key={tag}>
                {tag}
              </TagChip>
            ))}
          </div>
          <p className="mt-2 text-xs font-bold text-zinc-400">
            평점 {place.averageRating ?? place.rating ?? 0} · 방문 {place.visitCount ?? 0} · 리뷰 {place.reviewCount ?? 0}
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => onEdit(place)} variant="secondary">
            수정
          </Button>
          <Button onClick={() => onRemove(place.id)} variant="ghost">
            삭제
          </Button>
        </div>
      </div>
    </article>
  );
}

export function AdminPlacesClient({ initialPlaces, tags }) {
  const [places, setPlaces] = useState(initialPlaces);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const resetForm = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
  };

  const submit = async () => {
    try {
      if (editingId) {
        const updated = await updatePlace(editingId, form);
        setPlaces((current) => current.map((place) => (place.id === editingId ? updated : place)));
        resetForm();
      } else {
        const created = await createPlace(form);
        setPlaces((current) => [created, ...current]);
        setForm(EMPTY_FORM);
      }

      setMessage("저장 완료");
    } catch (error) {
      setMessage(getErrorMessage(error));
    }
  };

  const startEdit = (place) => {
    setEditingId(place.id);
    setForm({
      kakaoPlaceId: place.kakaoPlaceId ?? "",
      name: place.name,
      category: place.category,
      address: place.address,
      lat: place.lat,
      lng: place.lng,
      description: place.description,
      imageUrl: place.imageUrl,
      tagIds: place.tags ?? [],
    });
  };

  const remove = async (placeId) => {
    if (!window.confirm("삭제하시겠습니까?")) return;

    try {
      await deletePlace(placeId);
      setPlaces((current) => current.filter((place) => place.id !== placeId));
      setMessage("삭제 완료");
    } catch (error) {
      setMessage(getErrorMessage(error));
    }
  };

  return (
    <div className="w-full md:pl-8">
      <h1 className="text-2xl font-extrabold">장소 관리</h1>
      <Message>{message}</Message>
      <PlaceForm
        editingId={editingId}
        form={form}
        onCancel={resetForm}
        onChange={setForm}
        onSubmit={submit}
        tags={tags}
      />
      <PlaceList onEdit={startEdit} onRemove={remove} places={places} />
    </div>
  );
}
