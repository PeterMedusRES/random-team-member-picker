import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";

export const TeamPickerCardSkeleton = () => {
  return (
    <Card className="h-[32rem] w-[24rem]">
      <CardHeader>
        <div className="flex h-10 items-center">
          <Skeleton className="h-8 w-64" />
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className="aspect-square h-full w-full rounded-full" />
      </CardContent>
      <CardFooter className="flex justify-center">
        <Skeleton className="h-10 w-56" />
      </CardFooter>
    </Card>
  );
};
