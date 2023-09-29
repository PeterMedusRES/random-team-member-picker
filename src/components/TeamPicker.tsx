import LoadingSpinner from "~/components/LoadingSpinner";
import TeamPie from "~/components/TeamPie";
import { api } from "~/utils/api";

const TeamPicker = () => {
  const { data: team } = api.teams.getById.useQuery("uno-data");

  return (
    <div className="flex aspect-square w-1/4 items-center justify-center">
      {team ? <TeamPie team={team} /> : <LoadingSpinner />}
    </div>
  );
};

export default TeamPicker;
