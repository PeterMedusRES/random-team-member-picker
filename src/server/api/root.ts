import { createTRPCRouter } from "~/server/api/trpc";
import { teamRouter } from "~/server/api/routers/team";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  teams: teamRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
