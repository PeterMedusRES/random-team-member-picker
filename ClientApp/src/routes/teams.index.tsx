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
    <div className="flex w-full flex-col items-center">
      <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
        Teams
      </h1>
      <div className="mt-6 flex w-full max-w-md flex-col gap-4">
        {data.teams.map((team) => (
          <TeamCard key={team.teamId} team={team} />
        ))}
      </div>
    </div>
  );
}
