import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Button } from "~/components/ui/button";
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
    <div className="flex w-full max-w-sm flex-col gap-4">
      {data.teams.map((team) => (
        <Button key={team.teamId} asChild>
          <Link to="/teams/$teamId" params={{ teamId: team.teamId }}>
            Go to {team.name}
          </Link>
        </Button>
      ))}
    </div>
  );
}
