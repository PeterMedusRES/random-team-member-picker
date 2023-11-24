import { useState } from "react";
import PickerConfirmation from "~/components/PickerConfirmation";
import TeamPie from "~/components/TeamPie";
import { Button } from "~/components/ui/button";

type Member = {
  name: string;
  timesPicked: number;
};

type Team = {
  lastPicked: string;
  members: Member[];
};

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
  const team: Team = {
    lastPicked: "Callum",
    members: [
      {
        name: "Peter",
        timesPicked: 4,
      },
      {
        name: "Kieran",
        timesPicked: 2,
      },
      {
        name: "Eddie",
        timesPicked: 3,
      },
      {
        name: "Callum",
        timesPicked: 1,
      },
      {
        name: "Juan",
        timesPicked: 0,
      },
    ],
  };
  const probabilities = calculateProbabilities(team);

  const [chosenTeamMember, setChosenTeamMember] = useState("");

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
            onCancel={() => setChosenTeamMember("")}
          />
        ) : (
          <Button onClick={chooseTeamMember}>Choose Random Team Member</Button>
        )}
      </div>
    </div>
  );
};

export default TeamPicker;
