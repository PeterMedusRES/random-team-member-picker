import { queryOptions } from "@tanstack/react-query";
import { getTeamById } from "~/api";

export const teamQueryOptions = (id: number) =>
  queryOptions({
    queryKey: ["teams", id],
    queryFn: async () => await getTeamById(id),
  });
