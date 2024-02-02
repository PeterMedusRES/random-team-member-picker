import { useQuery } from "@tanstack/react-query";
import { TeamPickerCard } from "~/components/TeamPickerCard";
import { TeamPickerCardSkeleton } from "~/components/TeamPickerCardSkeleton";
import { teamQueryOptions } from "~/queries";

export const TeamPage = () => {
  const {
    data: team,
    isPending,
    isError,
    error,
  } = useQuery(teamQueryOptions(1));

  if (isPending) {
    return <TeamPickerCardSkeleton />;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return <TeamPickerCard team={team} />;
};
