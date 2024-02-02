import type { QueryClient } from "@tanstack/react-query";
import {
  Link,
  MatchRoute,
  Outlet,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import React, { Suspense } from "react";
import { ThemeDropdown } from "~/components/ThemeDropdown";
import { Button } from "~/components/ui/button";

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

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    component: RootComponent,
  },
);

function RootComponent() {
  return (
    <>
      <div className="flex min-h-screen w-full flex-col">
        <header className="flex h-16 items-center px-4">
          <MatchRoute from="/teams/$teamId">
            <Button size="sm" variant="ghost" asChild>
              <Link to="/teams">
                <ChevronLeft className="mr-2 h-4 w-4" /> All Teams
              </Link>
            </Button>
          </MatchRoute>
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
  );
}
