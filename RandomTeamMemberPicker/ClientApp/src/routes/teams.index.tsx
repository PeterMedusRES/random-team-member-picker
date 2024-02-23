import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { TeamCard } from "~/components/TeamCard";
import { teamsQueryOptions } from "~/queries";

export const Route = createFileRoute("/teams/")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(teamsQueryOptions());
  },
  component: TeamsList,
});

function TeamsList() {
  const { data } = useSuspenseQuery(teamsQueryOptions());

  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      {data.teams.map((team) => (
        <TeamCard key={team.teamId} team={team} />
      ))}
    </div>
  );
}
