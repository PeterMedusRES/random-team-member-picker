import { Outlet, createRootRoute } from "@tanstack/react-router";
import React, { Suspense } from "react";
import { ThemeDropdown } from "~/components/ThemeDropdown";

const TanStackRouterDevtools = import.meta.env.PROD
  ? () => null
  : React.lazy(() =>
      import("@tanstack/router-devtools").then((res) => ({
        default: res.TanStackRouterDevtools,
      })),
    );

const ReactQueryDevtools = import.meta.env.PROD
  ? () => null
  : React.lazy(() =>
      import("@tanstack/react-query-devtools").then((res) => ({
        default: res.ReactQueryDevtools,
      })),
    );

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="flex min-h-screen w-full flex-col">
        <header className="flex h-16 items-center px-4">
          <div className="m-auto" />
          <ThemeDropdown />
        </header>
        <main className="flex w-full grow flex-col items-center justify-center p-6">
          <Outlet />
        </main>
      </div>
      {import.meta.env.DEV && (
        <Suspense fallback={null}>
          <TanStackRouterDevtools />
          <ReactQueryDevtools />
        </Suspense>
      )}
    </>
  ),
});
