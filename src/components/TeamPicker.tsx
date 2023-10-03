import { useState } from "react";
import Button from "~/components/Button";
import LoadingSpinner from "~/components/LoadingSpinner";
import PickerConfirmation from "~/components/PickerConfirmation";
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
      <span className="text-xl text-red-500 md:text-2xl">
        Error: {error?.message}
      </span>
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
    <div className="flex w-full flex-col items-center">
      <h2 className="py-4 text-3xl font-bold">Chance of being picked</h2>
      <div className="w-3/4 max-w-sm">
        <TeamPie probabilities={probabilities} />
      </div>
      <div className="py-6">
        {chosenTeamMember ? (
          <PickerConfirmation
            chosenTeamMember={chosenTeamMember}
            onCancel={() => setChosenTeamMember(null)}
          />
        ) : (
          <Button onClick={chooseTeamMember}>Choose Random Team Member</Button>
        )}
      </div>
    </div>
  );
};

export default TeamPicker;
