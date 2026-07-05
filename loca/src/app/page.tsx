import Link from "next/link";
import { Icon } from "@/src/components/common/Icon";
import { AppShell } from "@/src/components/layout/AppShell";

export default function HomePage() {
  return (
    <AppShell>
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold tracking-tight text-[var(--brand)]">LOCA</h1>
        <button aria-label="알림" className="rounded-full p-2 text-zinc-500" type="button">
          <Icon name="bell" />
        </button>
      </header>

      <section className="relative mt-14 overflow-hidden rounded-b-[28px] pb-24">
        <h2 className="text-3xl font-extrabold leading-tight text-[var(--text)]">
          오늘은
          <br />
          어떤 동네를
          <br />
          탐험할까요?
        </h2>
        <p className="mt-5 text-sm font-semibold leading-6 text-zinc-500">
          나만의 취향으로
          <br />
          홍대를 즐겨보세요.
        </p>
        <div className="absolute bottom-0 right-0 h-36 w-64 opacity-70">
          <div className="absolute bottom-0 right-6 h-24 w-16 rounded-t-xl border border-[#d8ded5] bg-white/70" />
          <div className="absolute bottom-0 right-24 h-32 w-20 rounded-t-2xl border border-[#d8ded5] bg-white/60" />
          <div className="absolute bottom-0 right-44 h-20 w-14 rounded-t-xl border border-[#d8ded5] bg-white/70" />
          <div className="absolute bottom-0 right-20 h-20 w-5 rounded-full bg-[#abc7a2]" />
          <div className="absolute bottom-0 right-40 h-14 w-4 rounded-full bg-[#bfd4b9]" />
        </div>
      </section>

      <section className="-mx-5 mt-2 border-t border-[var(--border)] bg-white px-5 py-8">
        <Link className="block rounded-2xl bg-[linear-gradient(135deg,#285b3b,#17462c)] p-5 text-white shadow-[0_14px_34px_rgba(31,90,57,0.22)]" href="/for-you">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-extrabold">ForYou</h3>
              <p className="mt-4 text-sm font-medium leading-6 text-white/80">
                내 취향에 맞는
                <br />
                장소 추천받기
              </p>
            </div>
            <Icon className="h-6 w-6 text-white/80" name="heart" />
          </div>
          <span className="mt-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-[var(--brand)]">
            <Icon className="h-4 w-4" name="chevron" />
          </span>
        </Link>

        <Link className="mt-4 block rounded-2xl bg-[#efefe4] p-5 text-[var(--text)]" href="/explore">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-extrabold text-[var(--brand)]">Explore</h3>
              <p className="mt-4 text-sm font-semibold leading-6 text-zinc-500">
                새로운 로컬을
                <br />
                탐험하기
              </p>
            </div>
            <Icon className="h-6 w-6 text-[var(--brand)]" name="bookmark" />
          </div>
          <span className="mt-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--brand)] text-white">
            <Icon className="h-4 w-4" name="chevron" />
          </span>
        </Link>
      </section>
    </AppShell>
  );
}
