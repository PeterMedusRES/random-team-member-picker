import { createLazyFileRoute } from "@tanstack/react-router";
import { TeamPage } from "~/components/TeamPage";

export const Route = createLazyFileRoute("/")({
  component: TeamPage,
});
