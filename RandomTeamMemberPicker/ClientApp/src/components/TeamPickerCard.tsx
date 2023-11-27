import { HelpCircle } from "lucide-react";
import { useState } from "react";
import { type Member, type Team } from "~/api";
import PickerConfirmation from "~/components/PickerConfirmation";
import TeamPie from "~/components/TeamPie";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

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

export const TeamPickerCard = ({ team }: { team: Team }) => {
  const [chosenMember, setChosenMember] = useState<Member | undefined>(
    undefined,
  );

  const probabilities = calculateMemberProbabilities(
    team.members,
    team.lastPickedMemberId,
  );

  const chooseRandomMemberId = () => {
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

  return (
    <Card className="h-[32rem] w-[24rem]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Chance of being picked</CardTitle>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="link" size="icon" className="cursor-help">
                <HelpCircle className="text-muted-foreground" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="w-80">
              <p>
                The probability of a team member being picked is{" "}
                <em>inversely proportional</em> to the number of times they have
                been picked in the past.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardContent>
        <AspectRatio ratio={1}>
          <TeamPie probabilities={probabilities} />
        </AspectRatio>
      </CardContent>
      <CardFooter className="flex justify-center">
        {chosenMember ? (
          <PickerConfirmation
            chosenMember={chosenMember}
            onCancel={() => setChosenMember(undefined)}
          />
        ) : (
          <Button onClick={chooseRandomMemberId}>
            Choose Random Team Member
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
