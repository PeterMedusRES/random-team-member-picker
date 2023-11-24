import { useQuery } from "@tanstack/react-query";
import { getTeamById } from "~/api";

export const useTeamQuery = (id: number) =>
  useQuery({
    queryKey: ["teams", id],
    queryFn: async () => await getTeamById(id),
  });
