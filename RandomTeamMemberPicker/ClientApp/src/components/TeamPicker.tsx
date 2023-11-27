import clsx from "clsx";
import { HelpCircle } from "lucide-react";
import { useState } from "react";
import { type Member } from "~/api";
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
import { Skeleton } from "~/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
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
    content = <Skeleton className="h-full w-full rounded-full" />;
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
    <Card className="w-[24rem]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 py-5">
        <CardTitle>
          {isPending
            ? "Loading..."
            : isError
              ? "Error"
              : "Chance of being picked"}
        </CardTitle>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="link"
                size="icon"
                disabled={!isSuccess}
                className="cursor-help"
              >
                <HelpCircle
                  className={clsx(
                    "text-muted-foreground",
                    !isSuccess && "hidden",
                  )}
                />
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
        <AspectRatio ratio={1}>{content}</AspectRatio>
      </CardContent>
      <CardFooter className="flex justify-center">
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
      </CardFooter>
    </Card>
  );
};

export default TeamPicker;
