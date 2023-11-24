export type Member = {
  memberId: number;
  name: string;
};

export type Team = {
  teamId: number;
  name: string;
  lastPickedMemberId?: number;
  members: Member[];
};

export const getTeamById = async (id: number) => {
  const res = await fetch(`/api/teams/${id}`);
  const data = (await res.json()) as Team;
  console.log(data);
  return data;
};
