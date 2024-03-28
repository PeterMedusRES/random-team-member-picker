namespace RandomTeamMemberPicker;

using RandomTeamMemberPicker.Data;
using StackExchange.Redis;

public class RedisTeamsRepository(IConnectionMultiplexer redis) : ITeamsRepository
{
    private readonly IDatabase _db = redis.GetDatabase();

    public async Task<TeamListDto> GetAllTeamsAsync()
    {
        const int teamId = 1;

        var teamDetail = await GetTeamByIdAsync(teamId);
        if (teamDetail is null)
        {
            return new TeamListDto
            {
                Teams = [],
            };
        }

        var team = new TeamDto
        {
            TeamId = teamId,
            Name = teamDetail.Name,
            MemberCount = 0,
        };

        return new TeamListDto
        {
            Teams = [team],
        };
    }

    public async Task<TeamDetailDto?> GetTeamByIdAsync(int teamId)
    {
        if (teamId != 1)
        {
            return null;
        }

        const string key = "team:1";

        var teamHashEntries = await _db.HashGetAllAsync(key);
        if (teamHashEntries.Length == 0)
        {
            return null;
        }

        var name = teamHashEntries.Single(entry => entry.Name == "name").Value;
        return new TeamDetailDto
        {
            TeamId = 1,
            Name = name.ToString(),
            LastPickedMemberId = null,
            Members = [],
        };
    }

    public async Task<TeamDetailDto> InsertTeamAsync(InsertTeamDto teamToInsert)
    {
        const string key = "team:1";

        if (!await _db.HashSetAsync(key, "name", teamToInsert.Name, When.NotExists))
        {
            throw new InvalidOperationException("Team already exists");
        }

        return new TeamDetailDto
        {
            TeamId = 1,
            Name = teamToInsert.Name,
            LastPickedMemberId = null,
            Members = [],
        };
    }

    public async Task<bool> UpdateTeamAsync(int teamId, InsertTeamDto teamToUpdate) => throw new NotImplementedException();

    public async Task<bool> DeleteTeamAsync(int teamId)
    {
        const string key = "team:1";

        return await _db.KeyDeleteAsync(key);
    }

    public async Task<MemberDto?> InsertMemberAsync(int teamId, InsertMemberDto memberToInsert) => throw new NotImplementedException();

    public async Task<bool> UpdateMemberAsync(int teamId, int memberId, InsertMemberDto memberToUpdate) => throw new NotImplementedException();

    public async Task<bool> DeleteMemberAsync(int teamId, int memberId) => throw new NotImplementedException();
}
