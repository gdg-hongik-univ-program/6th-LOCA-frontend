"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/src/components/common/Icon";

const items = [
  { href: "/", icon: "home", label: "홈" },
  { href: "/explore", icon: "search", label: "탐색" },
  { href: "/review/write", icon: "plus", label: "기록" },
  { href: "/my", icon: "bookmark", label: "저장" },
  { href: "/my", icon: "user", label: "마이" },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="absolute inset-x-0 bottom-0 z-20 mx-auto w-full border-t border-[var(--border)] bg-white/95 px-5 pb-[calc(12px+env(safe-area-inset-bottom))] pt-3 backdrop-blur">
      <div className="flex items-center justify-between">
        {items.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              aria-label={item.label}
              className={`flex h-10 w-10 items-center justify-center rounded-full transition ${
                active ? "text-[var(--brand)]" : "text-zinc-400"
              }`}
              href={item.href}
              key={`${item.icon}-${item.label}`}
            >
              <Icon className="h-5 w-5" name={item.icon} />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
