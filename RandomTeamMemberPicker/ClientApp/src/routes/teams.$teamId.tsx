import { createFileRoute } from "@tanstack/react-router";
import { TeamPage } from "~/components/TeamPage";

export const Route = createFileRoute("/teams/$teamId")({
  component: () => <TeamPage />,
});
