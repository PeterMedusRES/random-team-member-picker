import { useState } from "react";
import LoadingSpinner from "~/components/LoadingSpinner";
import TeamPie from "~/components/TeamPie";
import { api, type RouterOutputs } from "~/utils/api";

type Team = RouterOutputs["teams"]["getById"];

const calculateProbabilities = (team: Team) => {
  const eligibleMembers = team.members.filter(
    (member) => member.name != team.lastPicked,
  );

  // The chance of getting picked is inversely proportional to the number of times a member was picked in the past.
  const inverseProportions = eligibleMembers.map((member) => {
    const inverseProportion = 1 / (member.timesPicked + 1);
    return { name: member.name, inverseProportion };
  });

  const denominator = inverseProportions
    .map((member) => member.inverseProportion)
    .reduce((a, b) => a + b, 0);

  const probabilities = inverseProportions.map((member) => {
    const probability = member.inverseProportion / denominator;
    return { name: member.name, probability };
  });

  return probabilities.sort((member) => member.probability);
};

const TeamPicker = () => {
  const { data: team, status, error } = api.teams.getById.useQuery("uno-data");
  const [chosenTeamMember, setChosenTeamMember] = useState<string | null>(null);

  if (status === "error") {
    return (
      <span className="text-2xl text-red-500">Error: {error.message}</span>
    );
  }

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  const probabilities = calculateProbabilities(team);

  const chooseTeamMember = () => {
    const randomNumber = Math.random();

    let upperBound = 0;
    for (const member of probabilities) {
      upperBound += member.probability;
      if (randomNumber <= upperBound) {
        setChosenTeamMember(member.name);
        break;
      }
    }
  };

  return (
    <div className="flex w-full flex-col items-center gap-y-8">
      <button
        className="rounded-lg bg-blue-500 p-3 text-lg font-medium text-white hover:bg-blue-400"
        onClick={chooseTeamMember}
      >
        Choose Random Team Member
      </button>
      <div className="w-1/4">
        <TeamPie probabilities={probabilities} />
      </div>
      {chosenTeamMember && (
        <p className="text-4xl text-green-600">
          <strong>{chosenTeamMember}</strong> was chosen!
        </p>
      )}
    </div>
  );
};

export default TeamPicker;
