import { queryOptions } from "@tanstack/react-query";
import { getAllTeams, getTeamById } from "~/api";

export const teamsQueryOptions = () =>
  queryOptions({
    queryKey: ["teams"],
    queryFn: async () => await getAllTeams(),
  });

export const teamQueryOptions = (id: number) =>
  queryOptions({
    queryKey: ["teams", id],
    queryFn: async () => await getTeamById(id),
  });
