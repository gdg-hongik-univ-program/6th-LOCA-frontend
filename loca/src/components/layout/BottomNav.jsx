"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/src/components/common/Icon";
import Image from "next/image";

const copy = {
  platform:
    "\ub098\ub9cc\uc758 \ubc29\uc2dd\uc73c\ub85c \ub3d9\ub124\ub97c \ud0d0\ud5d8\ud558\ub294 \ub85c\uceec \ud50c\ub7ab\ud3fc",
  home: "\ud648",
  explore: "\ud0d0\uc0c9",
  record: "\uae30\ub85d",
  saved: "\uc800\uc7a5",
  my: "\ub9c8\uc774",
};

const items = [
  { href: "/", icon: "home", label: copy.home },
  { href: "/explore", icon: "search", label: copy.explore },
  { href: "/review/write", icon: "plus", label: copy.record },
  { href: "/my", icon: "bookmark", label: copy.saved },
  { href: "/my", icon: "user", label: copy.my },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="absolute inset-x-0 bottom-0 z-20 mx-auto w-full border-t border-[var(--border)] bg-white/95 px-5 pb-[calc(12px+env(safe-area-inset-bottom))] pt-3 backdrop-blur md:inset-y-0 md:left-0 md:right-auto md:w-64 md:border-r md:border-t-0 md:px-5 md:py-8">
      <div className="hidden px-2 md:block">
        <div className="flex items-center gap-2">
          <Image
            src="/LOCA-icon.svg"
            alt="LOCA 로고 아이콘"
            width={28}
            height={28}
            className="object-contain"
          />

          <p className="text-3xl font-extrabold tracking-tight text-[var(--brand)]">
            LOCA
          </p>
        </div>
        <p className="mt-3 text-sm font-semibold leading-6 text-zinc-500">
          {copy.platform}
        </p>
      </div>
      <div className="flex items-center justify-between md:mt-10 md:flex-col md:items-stretch md:gap-2">
        {items.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              aria-label={item.label}
              className={`flex h-10 w-10 items-center justify-center rounded-full transition md:h-12 md:w-full md:justify-start md:gap-3 md:px-4 md:text-sm md:font-bold ${
                active
                  ? "bg-zinc-100 text-[var(--brand)]"
                  : "text-zinc-400 hover:bg-zinc-50"
              }`}
              href={item.href}
              key={`${item.icon}-${item.label}`}
            >
              <Icon className="h-5 w-5" name={item.icon} />
              <span className="hidden md:inline">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
