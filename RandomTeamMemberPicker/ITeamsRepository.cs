namespace RandomTeamMemberPicker;

using RandomTeamMemberPicker.Data;

public interface ITeamsRepository
{
    Task<TeamListDto> GetAllTeamsAsync();

    Task<TeamDetailDto?> GetTeamByIdAsync(int teamId);

    Task<TeamDetailDto> InsertTeamAsync(InsertTeamDto teamToInsert);

    Task<bool> UpdateTeamAsync(int teamId, InsertTeamDto teamToUpdate);

    Task<bool> DeleteTeamAsync(int teamId);

    Task<MemberDto?> InsertMemberAsync(int teamId, InsertMemberDto memberToInsert);

    Task<bool> UpdateMemberAsync(int teamId, int memberId, InsertMemberDto memberToUpdate);

    Task<bool> DeleteMemberAsync(int teamId, int memberId);
}
