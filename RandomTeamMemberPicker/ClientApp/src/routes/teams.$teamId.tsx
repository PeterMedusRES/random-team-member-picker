import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { TeamPickerCard } from "~/components/TeamPickerCard";
import { TeamPickerCardSkeleton } from "~/components/TeamPickerCardSkeleton";
import { teamQueryOptions } from "~/queries";

export const Route = createFileRoute("/teams/$teamId")({
  component: TeamPage,
});

function TeamPage() {
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
}
