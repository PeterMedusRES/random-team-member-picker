import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const teamRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.string())
    .query(({ ctx: _ctx, input: _input }) => {
      return {
        lastPicked: "Callum",
        members: [
          {
            name: "Peter",
            timesPicked: 4,
          },
          {
            name: "Kieran",
            timesPicked: 2,
          },
          {
            name: "Eddie",
            timesPicked: 3,
          },
          {
            name: "Callum",
            timesPicked: 1,
          },
          {
            name: "Juan",
            timesPicked: 0,
          },
        ],
      };
    }),
});
