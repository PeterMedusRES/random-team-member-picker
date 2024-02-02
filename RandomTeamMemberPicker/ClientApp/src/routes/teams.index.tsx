import { Link, createFileRoute } from "@tanstack/react-router";
import { Button } from "~/components/ui/button";

export const Route = createFileRoute("/teams/")({
  component: () => (
    <Button asChild>
      <Link to="/teams/$teamId" params={{ teamId: "1" }}>
        Go to UNO Data Team Demos
      </Link>
    </Button>
  ),
});
