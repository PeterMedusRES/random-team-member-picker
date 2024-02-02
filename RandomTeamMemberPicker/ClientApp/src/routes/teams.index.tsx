import { Link, createFileRoute } from "@tanstack/react-router";
import { Button } from "~/components/ui/button";

export const Route = createFileRoute("/teams/")({
  component: () => (
    <div className="flex flex-col gap-4">
      <Button asChild>
        <Link to="/teams/$teamId" params={{ teamId: 1 }}>
          Go to UNO Data Team Demos
        </Link>
      </Button>
      <Button asChild>
        <Link to="/teams/$teamId" params={{ teamId: 2 }}>
          Go to UNO Data Team Retros
        </Link>
      </Button>
    </div>
  ),
});
