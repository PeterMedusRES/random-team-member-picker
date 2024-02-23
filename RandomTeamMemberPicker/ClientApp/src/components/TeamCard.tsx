import { Link } from "@tanstack/react-router";
import { Users } from "lucide-react";
import type { Team } from "~/api";

const pluralRules = new Intl.PluralRules("en-GB");

function pluralise(count: number, singular: string, plural: string) {
  const grammaticalNumber = pluralRules.select(count);
  // English can only be singular (one) or plural (other)
  // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules#description
  switch (grammaticalNumber) {
    case "one":
      return count + " " + singular;
    case "other":
      return count + " " + plural;
  }
}

export function TeamCard({ team }: { team: Team }) {
  return (
    <Link
      to="/teams/$teamId"
      params={{ teamId: team.teamId }}
      className="flex flex-col gap-1 rounded-lg border p-4 hover:bg-accent"
    >
      <div className="text-xl font-semibold">{team.name}</div>
      <div className="flex items-center text-base text-muted-foreground">
        <Users className="mr-2 h-4 w-4" />{" "}
        {pluralise(team.memberCount, "member", "members")}
      </div>
    </Link>
  );
}
