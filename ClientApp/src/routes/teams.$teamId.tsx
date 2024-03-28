import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { integer, minValue, number, parse } from "valibot";
import { TeamPickerCard } from "~/components/TeamPickerCard";
import { TeamPickerCardSkeleton } from "~/components/TeamPickerCardSkeleton";
import { teamQueryOptions } from "~/queries";

export const Route = createFileRoute("/teams/$teamId")({
  parseParams: (params) => ({
    teamId: parse(
      number("Invalid team ID", [integer(), minValue(1)]),
      Number(params.teamId),
    ),
  }),
  stringifyParams: ({ teamId }) => ({ teamId: `${teamId}` }),
  loader: async ({ params, context }) => {
    await context.queryClient.ensureQueryData(teamQueryOptions(params.teamId));
  },
  component: TeamPage,
  pendingComponent: TeamPickerCardSkeleton,
});

function TeamPage() {
  const { teamId } = Route.useParams();
  const { data: team } = useSuspenseQuery(teamQueryOptions(teamId));

  return <TeamPickerCard team={team} />;
}
