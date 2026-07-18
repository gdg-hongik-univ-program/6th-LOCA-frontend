import { Suspense } from "react";
import { ReviewWriteForm } from "./ReviewWriteForm";

export default function ReviewWritePage() {
  return (
    <Suspense
      fallback={
        <div className="phone-shell flex items-center justify-center text-sm font-semibold text-zinc-500">
          기록 화면을 준비하고 있어요.
        </div>
      }
    >
      <ReviewWriteForm />
    </Suspense>
  );
}
