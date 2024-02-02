import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { TeamPickerCard } from "~/components/TeamPickerCard";
import { TeamPickerCardSkeleton } from "~/components/TeamPickerCardSkeleton";
import { teamQueryOptions } from "~/queries";

export const Route = createFileRoute("/teams/$teamId")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(teamQueryOptions(1));
  },
  component: TeamPage,
  pendingComponent: TeamPickerCardSkeleton,
});

function TeamPage() {
  const { data: team } = useSuspenseQuery(teamQueryOptions(1));

  return <TeamPickerCard team={team} />;
}
