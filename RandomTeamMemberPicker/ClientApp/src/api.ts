export type Member = {
  memberId: number;
  name: string;
  timesPicked: number;
};

export type Team = {
  teamId: number;
  name: string;
  lastPickedMemberId?: number;
  members: Member[];
};

export const getTeamById = async (id: number) => {
  const res = await fetch(`/api/teams/${id}`);
  return (await res.json()) as Team;
};
