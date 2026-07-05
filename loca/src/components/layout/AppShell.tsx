import type { ReactNode } from "react";
import { BottomNav } from "./BottomNav";

type AppShellProps = {
  children: ReactNode;
  showNav?: boolean;
  flush?: boolean;
};

export function AppShell({ children, showNav = true, flush = false }: AppShellProps) {
  return (
    <div className="phone-shell relative overflow-hidden">
      <main className={`app-content ${showNav ? "safe-bottom" : ""} ${flush ? "" : "px-5 pt-5 md:px-10 md:pt-10"}`}>{children}</main>
      {showNav ? <BottomNav /> : null}
    </div>
  );
}
