import { useState } from "react";
import { Button } from "@/src/components/common/Button";
import { createTag, deleteTag } from "@/src/services/tagService";

function getErrorMessage(error) {
  return error instanceof Error ? error.message : "요청 처리 중 문제가 발생했습니다.";
}

function Message({ children }) {
  if (!children) return null;

  return (
    <p className="mt-3 rounded-xl bg-zinc-100 px-4 py-3 text-sm font-bold text-zinc-600">
      {children}
    </p>
  );
}

function TagForm({ name, onChange, onSubmit }) {
  return (
    <section className="mt-5 rounded-2xl bg-white p-5 shadow-[0_10px_28px_rgba(24,24,27,0.08)]">
      <div className="flex gap-2">
        <input
          className="h-12 min-w-0 flex-1 rounded-xl border border-[var(--border)] px-4 text-sm"
          onChange={(event) => onChange(event.target.value)}
          placeholder="태그명"
          value={name}
        />
        <Button onClick={onSubmit}>생성</Button>
      </div>
    </section>
  );
}

function TagList({ onRemove, tags }) {
  return (
    <section className="mt-5 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold shadow-[0_8px_20px_rgba(24,24,27,0.08)]"
          key={tag.id}
        >
          {tag.name}
          <button className="text-zinc-400" onClick={() => onRemove(tag.id)} type="button">
            삭제
          </button>
        </span>
      ))}
    </section>
  );
}

export function AdminTagsClient({ initialTags }) {
  const [tags, setTags] = useState(initialTags);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const submit = async () => {
    try {
      const created = await createTag({ name });
      setTags((current) => [created, ...current]);
      setName("");
      setMessage("생성 완료");
    } catch (error) {
      setMessage(getErrorMessage(error));
    }
  };

  const remove = async (tagId) => {
    if (!window.confirm("삭제하시겠습니까?")) return;

    try {
      await deleteTag(tagId);
      setTags((current) => current.filter((tag) => tag.id !== tagId));
      setMessage("삭제 완료");
    } catch (error) {
      setMessage(getErrorMessage(error));
    }
  };

  return (
    <div className="w-full md:pl-8">
      <h1 className="text-2xl font-extrabold">태그 관리</h1>
      <Message>{message}</Message>
      <TagForm name={name} onChange={setName} onSubmit={submit} />
      <TagList onRemove={remove} tags={tags} />
    </div>
  );
}
