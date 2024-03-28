export type TeamList = {
  teams: Team[];
};

export type Team = {
  teamId: number;
  name: string;
  memberCount: number;
};

export type TeamDetail = {
  teamId: number;
  name: string;
  lastPickedMemberId?: number;
  members: Member[];
};

export type Member = {
  memberId: number;
  name: string;
  timesPicked: number;
};

export const getAllTeams = async () => {
  const res = await fetch("/api/teams");
  if (!res.ok) {
    throw new Error("Failed to load teams");
  }
  return (await res.json()) as TeamList;
};

export const getTeamById = async (id: number) => {
  const res = await fetch(`/api/teams/${id}`);
  if (!res.ok) {
    throw new Error(`Failed to load team ${id}: ${res.statusText}`);
  }
  return (await res.json()) as TeamDetail;
};
