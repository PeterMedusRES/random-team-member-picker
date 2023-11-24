import { useState } from "react";
import { type Member } from "~/api";
import PickerConfirmation from "~/components/PickerConfirmation";
import TeamPie from "~/components/TeamPie";
import { Button } from "~/components/ui/button";
import { useTeamQuery } from "~/queries";

const calculateMemberProbabilities = (
  members: Member[],
  lastPickedMemberId?: number,
) => {
  const eligibleMembers = new Map(
    members
      .filter((member) => member.memberId != lastPickedMemberId)
      .map((member) => [member.memberId, member]),
  );

  // The chance of getting picked is inversely proportional to the number of times a member was picked in the past.
  const weights = new Map(
    [...eligibleMembers.values()].map((member) => {
      const weight = 1 / (member.timesPicked + 1);
      return [member.memberId, weight];
    }),
  );

  const totalWeight = [...weights.values()].reduce((a, b) => a + b);

  const probabilities = [...eligibleMembers.values()].map((member) => {
    const weight = weights.get(member.memberId)!;
    const probability = weight / totalWeight;
    return { ...member, probability };
  });

  return probabilities.sort((member) => member.probability);
};

const TeamPicker = () => {
  const [chosenMember, setChosenMember] = useState<Member | undefined>(
    undefined,
  );
  const { isPending, isError, isSuccess, data: team, error } = useTeamQuery(1);

  let chooseRandomMemberId: (() => void) | undefined;
  let content: React.JSX.Element;
  if (isPending) {
    content = <span>Loading...</span>;
  } else if (isError) {
    content = <span>Error: {error.message}</span>;
  } else {
    const probabilities = calculateMemberProbabilities(
      team.members,
      team.lastPickedMemberId,
    );

    chooseRandomMemberId = () => {
      const randomNumber = Math.random();

      let upperBound = 0;
      for (const member of probabilities) {
        upperBound += member.probability;
        if (randomNumber <= upperBound) {
          setChosenMember(member);
          break;
        }
      }
    };
    content = <TeamPie probabilities={probabilities} />;
  }

  return (
    <div className="flex w-full flex-col items-center">
      <h2 className="py-4 text-3xl font-bold">Chance of being picked</h2>
      <div className="w-3/4 max-w-sm">{content}</div>
      <div className="py-6">
        {isSuccess && chosenMember ? (
          <PickerConfirmation
            chosenMember={chosenMember}
            onCancel={() => setChosenMember(undefined)}
          />
        ) : (
          <Button disabled={!isSuccess} onClick={chooseRandomMemberId}>
            Choose Random Team Member
          </Button>
        )}
      </div>
    </div>
  );
};

export default TeamPicker;
