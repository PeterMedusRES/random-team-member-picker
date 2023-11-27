import { TeamPickerCard } from "~/components/TeamPickerCard";
import { TeamPickerCardSkeleton } from "~/components/TeamPickerCardSkeleton";
import { useTeamQuery } from "~/queries";

export const TeamPage = () => {
  const { data: team, isPending, isError, error } = useTeamQuery(1);

  if (isPending) {
    return <TeamPickerCardSkeleton />;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return <TeamPickerCard team={team} />;
};
