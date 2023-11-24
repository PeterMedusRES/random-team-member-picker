namespace RandomTeamMemberPicker.Controllers;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RandomTeamMemberPicker.Data;
using RandomTeamMemberPicker.Models;

[Route("api/[controller]")]
[ApiController]
public class TeamsController : ControllerBase
{
    private readonly TeamDb _db;

    public TeamsController(TeamDb db)
    {
        _db = db;
    }

    [HttpGet]
    [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Get))]
    public IAsyncEnumerable<TeamDto> GetAllTeams()
    {
        return _db.Teams
            .Select(t => new TeamDto { Name = t.Name, TeamId = t.TeamId })
            .AsAsyncEnumerable();
    }

    [HttpGet("{id:int}")]
    [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Get))]
    public async Task<ActionResult<TeamDetailDto>> GetTeamById(int id)
    {
        var team = await _db.Teams
            .Include(team => team.Members)
            .SingleOrDefaultAsync(team => team.TeamId == id);

        if (team is null)
        {
            return NotFound();
        }

        return Ok(
            new TeamDetailDto
            {
                TeamId = team.TeamId,
                Name = team.Name,
                LastPickedMemberId = team.LastPickedMemberId,
                Members = team.Members
                    .Select(m => new MemberDto { MemberId = m.MemberId, Name = m.Name })
                    .ToList(),
            }
        );
    }

    [HttpPost]
    [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Post))]
    public async Task<ActionResult<TeamDetailDto>> InsertTeam(InsertTeamDto team)
    {
        var entity = new Team { Name = team.Name };
        await _db.Teams.AddAsync(entity);
        await _db.SaveChangesAsync();

        var teamDetailDto = new TeamDetailDto
        {
            TeamId = entity.TeamId,
            Name = entity.Name,
            LastPickedMemberId = entity.LastPickedMemberId,
            Members = entity.Members
                .Select(m => new MemberDto { MemberId = m.MemberId, Name = m.Name })
                .ToList(),
        };

        return CreatedAtAction(
            nameof(GetTeamById),
            new { id = teamDetailDto.TeamId },
            teamDetailDto
        );
    }

    [HttpPut("{id:int}")]
    [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Put))]
    public async Task<IActionResult> UpdateTeam(InsertTeamDto update, int id)
    {
        var team = await _db.Teams.FindAsync(id);
        if (team is null)
        {
            return NotFound();
        }

        team.Name = update.Name;
        await _db.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id:int}")]
    [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Delete))]
    public async Task<IActionResult> DeleteTeam(int id)
    {
        var team = await _db.Teams.FindAsync(id);
        if (team is null)
        {
            return NotFound();
        }

        _db.Teams.Remove(team);
        await _db.SaveChangesAsync();

        return Ok();
    }

    [HttpPost("{id:int}/Members/")]
    [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Post))]
    public async Task<ActionResult<MemberDto>> InsertMember(InsertMemberDto member, int id)
    {
        var team = await _db.Teams.FindAsync(id);
        if (team is null)
        {
            return NotFound();
        }

        var entity = new Member { Name = member.Name };
        team.Members.Add(entity);

        await _db.SaveChangesAsync();

        var memberDto = new MemberDto { MemberId = entity.MemberId, Name = entity.Name };
        return CreatedAtAction(nameof(GetTeamById), new { id = team.TeamId }, memberDto);
    }

    [HttpPut("{id:int}/Members/{memberId:int}")]
    [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Put))]
    public async Task<IActionResult> UpdateMember(InsertMemberDto update, int id, int memberId)
    {
        var team = await _db.Teams
            .Include(team => team.Members)
            .SingleOrDefaultAsync(team => team.TeamId == id);
        if (team is null)
        {
            return NotFound();
        }

        var member = team.Members.SingleOrDefault(member => member.MemberId == memberId);
        if (member is null)
        {
            return NotFound();
        }

        member.Name = update.Name;

        await _db.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id:int}/Members/{memberId:int}")]
    [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Delete))]
    public async Task<IActionResult> DeleteMember(int id, int memberId)
    {
        var team = await _db.Teams
            .Include(team => team.Members)
            .SingleOrDefaultAsync(team => team.TeamId == id);
        if (team is null)
        {
            return NotFound();
        }

        var member = team.Members.SingleOrDefault(member => member.MemberId == memberId);
        if (member is null)
        {
            return NotFound();
        }

        team.Members.Remove(member);

        if (team.LastPickedMemberId == memberId)
        {
            team.LastPickedMemberId = null;
        }

        await _db.SaveChangesAsync();

        return Ok();
    }
}
