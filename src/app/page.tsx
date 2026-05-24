import { Suspense } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { NavigatorShell } from "@/components/features/navigator-shell";

function ShellSkeleton() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-12">
      <div className="h-8 w-48 rounded bg-surface-2 animate-pulse" />
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-40 rounded-lg border border-border bg-surface-1 animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <Suspense fallback={<ShellSkeleton />}>
          <NavigatorShell />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
