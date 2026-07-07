import Image from "next/image";
import Link from "next/link";
import { AppShell } from "@/src/components/layout/AppShell";
import { Icon } from "@/src/components/common/Icon";

const contributors = [
  { name: "조현", github: "alexhyun7777-code", role: "Frontend Developer" },
  { name: "오지훈", github: "devhooni", role: "Frontend Developer" },
  { name: "권동하", github: "Marlozing", role: "Backend Developer" },
  { name: "정지윤", github: "jiyun0516", role: "Backend Developer" },
];

export default function ContributorsPage() {
  return (
    <AppShell>
      <div className="w-full p-5 sm:p-8">
        <header className="flex items-center justify-between mb-6 md:hidden">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="flex items-center justify-center p-1.5 -ml-2 rounded-full text-zinc-600 active:bg-zinc-100 dark:text-zinc-400 dark:active:bg-zinc-800"
              aria-label="홈으로 이동">
              <Icon name="chevron" className="h-5 w-5 rotate-180" />
            </Link>
            <div className="flex items-center gap-1.5">
              <Image
                src="/LOCA-icon.svg"
                alt="LOCA 로고 아이콘"
                width={20}
                height={20}
                className="object-contain"
              />
              <h1 className="text-xl font-extrabold tracking-tight text-[var(--brand)]">
                Contributors
              </h1>
            </div>
          </div>
          <a
            href="https://github.com/gdg-hongik-univ-program/6th-LOCA-frontend"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center p-2 rounded-full text-zinc-600 active:bg-zinc-100 dark:text-zinc-400 dark:active:bg-zinc-800"
            aria-label="GitHub 레포지토리로 이동">
            <span>Repository</span>
          </a>
        </header>

        <header className="hidden mb-12 md:flex md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="flex items-center justify-center p-2 -ml-2 rounded-full text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-200"
                aria-label="홈으로 이동">
                <Icon name="chevron" className="h-6 w-6 rotate-180" />
              </Link>
              <div className="flex items-center gap-2">
                <Image
                  src="/LOCA-icon.svg"
                  alt="LOCA 로고 아이콘"
                  width={32}
                  height={32}
                  className="object-contain"
                />
                <h1 className="text-3xl font-extrabold tracking-tight text-[var(--brand)] sm:text-4xl">
                  LOCA Contributors
                </h1>
              </div>
            </div>
            <p className="mt-2 text-zinc-500 pl-11">
              로컬 취향 탐험 플랫폼, LOCA를 함께 만들어가는 팀원들입니다.
            </p>
          </div>
          <a
            href="https://github.com/gdg-hongik-univ-program/6th-LOCA-frontend"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold !text-white bg-zinc-100 hover:bg-zinc-200 rounded-xl transition dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-200">
            <span>Repository</span>
          </a>
        </header>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
          {contributors.map((member) => (
            <div
              key={member.github}
              className="h-[120px] md:h-[280px] [perspective:1000px] group">
              <a
                href={`https://github.com/${member.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-full h-full duration-500 [transform-style:preserve-3d] md:group-hover:[transform:rotateY(180deg)] flex md:block rounded-2xl">
                {/* 앞면 (기본 프로필 화면) */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] flex flex-row items-center gap-4 rounded-2xl border border-zinc-100 bg-white p-4 shadow-sm md:flex-col md:text-center md:p-6 md:gap-0 dark:border-zinc-800 dark:bg-zinc-900">
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full border-2 border-zinc-100 md:h-24 md:w-24 md:mb-4">
                    <Image
                      src={`https://github.com/${member.github}.png`}
                      alt={`${member.name} profile`}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-col md:items-center">
                    <h2 className="text-lg font-bold text-zinc-800 md:text-xl dark:text-zinc-100">
                      {member.name}
                    </h2>
                    <p className="text-xs font-semibold text-zinc-500 md:text-sm md:mt-1 dark:text-zinc-400">
                      {member.role}
                    </p>
                    <span className="mt-2 text-[11px] text-zinc-400 md:text-xs md:mt-4">
                      @{member.github}
                    </span>
                  </div>
                </div>

                {/* 뒷면 (PC용 3D 반전 화면 - 모바일은 공간 한계로 숨김) */}
                <div className="hidden md:flex absolute inset-0 w-full h-full [transform:rotateY(180deg)] [backface-visibility:hidden] flex-col items-center justify-center rounded-2xl border border-[var(--brand)] bg-zinc-50 p-6 text-center dark:bg-zinc-800 dark:border-[var(--brand)]">
                  <Icon
                    name="user"
                    className="h-10 w-10 text-[var(--brand)] mb-3"
                  />
                  <h3 className="text-base font-bold text-zinc-800 dark:text-zinc-100">
                    {member.name}
                  </h3>
                  <span className="text-xs text-zinc-400 mb-4">
                    @{member.github}
                  </span>
                  <span className="px-4 py-1.5 bg-[var(--brand)] text-white text-xs font-bold rounded-lg shadow-sm">
                    GitHub 방문하기
                  </span>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
