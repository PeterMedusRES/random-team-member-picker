namespace RandomTeamMemberPicker;

using Microsoft.EntityFrameworkCore;
using RandomTeamMemberPicker.Data;
using RandomTeamMemberPicker.Models;

public class SqlTeamsRepository(TeamDb db) : ITeamsRepository
{
    public async Task<TeamListDto> GetAllTeamsAsync() => new()
    {
        Teams = await db.Teams
            .Select(t => new TeamDto
            {
                Name = t.Name,
                TeamId = t.TeamId,
                MemberCount = t.Members.Count,
            })
            .ToListAsync(),
    };

    public async Task<TeamDetailDto?> GetTeamByIdAsync(int teamId)
    {
        var team = await db.Teams
            .Include(team => team.Members)
            .SingleOrDefaultAsync(team => team.TeamId == teamId);

        if (team is null)
        {
            return null;
        }

        return new TeamDetailDto
        {
            TeamId = team.TeamId,
            Name = team.Name,
            LastPickedMemberId = team.LastPickedMemberId,
            Members = team.Members
                .Select(m => new MemberDto
                {
                    MemberId = m.MemberId,
                    Name = m.Name,
                    TimesPicked = m.TimesPicked,
                })
                .ToList(),
        };
    }

    public async Task<TeamDetailDto> InsertTeamAsync(InsertTeamDto teamToInsert)
    {
        var team = new Team { Name = teamToInsert.Name };
        await db.Teams.AddAsync(team);
        await db.SaveChangesAsync();

        return new TeamDetailDto
        {
            TeamId = team.TeamId,
            Name = team.Name,
            LastPickedMemberId = team.LastPickedMemberId,
            Members = team.Members
                .Select(m => new MemberDto
                {
                    MemberId = m.MemberId,
                    Name = m.Name,
                    TimesPicked = m.TimesPicked,
                })
                .ToList(),
        };
    }

    public async Task<bool> UpdateTeamAsync(int teamId, InsertTeamDto teamToUpdate)
    {
        var team = await db.Teams.FindAsync(teamId);
        if (team is null)
        {
            return false;
        }

        team.Name = teamToUpdate.Name;
        await db.SaveChangesAsync();

        return true;
    }

    public async Task<bool> DeleteTeamAsync(int teamId)
    {
        var team = await db.Teams.FindAsync(teamId);
        if (team is null)
        {
            return false;
        }

        db.Teams.Remove(team);
        await db.SaveChangesAsync();

        return true;
    }

    public async Task<MemberDto?> InsertMemberAsync(int teamId, InsertMemberDto memberToInsert)
    {
        var team = await db.Teams.FindAsync(teamId);
        if (team is null)
        {
            return null;
        }

        var member = new Member { Name = memberToInsert.Name };
        team.Members.Add(member);

        await db.SaveChangesAsync();

        return new MemberDto
        {
            MemberId = member.MemberId,
            Name = member.Name,
            TimesPicked = member.TimesPicked,
        };
    }

    public async Task<bool> UpdateMemberAsync(int teamId, int memberId, InsertMemberDto memberToUpdate)
    {
        var team = await db.Teams
            .Include(team => team.Members)
            .SingleOrDefaultAsync(team => team.TeamId == teamId);

        var member = team?.Members.SingleOrDefault(member => member.MemberId == memberId);
        if (member is null)
        {
            return false;
        }

        member.Name = memberToUpdate.Name;
        await db.SaveChangesAsync();

        return true;
    }

    public async Task<bool> DeleteMemberAsync(int teamId, int memberId)
    {
        var team = await db.Teams
            .Include(team => team.Members)
            .SingleOrDefaultAsync(team => team.TeamId == teamId);

        var member = team?.Members.SingleOrDefault(member => member.MemberId == memberId);
        if (member is null)
        {
            return false;
        }

        team!.Members.Remove(member);

        if (team.LastPickedMemberId == memberId)
        {
            team.LastPickedMemberId = null;
        }

        await db.SaveChangesAsync();

        return true;
    }
}
