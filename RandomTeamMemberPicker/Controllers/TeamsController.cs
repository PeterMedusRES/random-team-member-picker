namespace RandomTeamMemberPicker.Controllers;

using Microsoft.AspNetCore.Mvc;
using RandomTeamMemberPicker.Data;

[Route("api/[controller]")]
[ApiController]
public class TeamsController(ITeamsRepository teamsRepository) : ControllerBase
{
    [HttpGet]
    [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Get))]
    public async Task<ActionResult<TeamListDto>> GetAllTeams() => Ok(await teamsRepository.GetAllTeamsAsync());

    [HttpGet("{teamId:int}")]
    [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Get))]
    public async Task<ActionResult<TeamDetailDto>> GetTeamById(int teamId)
    {
        var team = await teamsRepository.GetTeamByIdAsync(teamId);

        return team is not null ? Ok(team) : NotFound();
    }

    [HttpPost]
    [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Post))]
    public async Task<ActionResult<TeamDetailDto>> InsertTeam(InsertTeamDto teamToInsert)
    {
        var createdTeam = await teamsRepository.InsertTeamAsync(teamToInsert);

        return CreatedAtAction(nameof(GetTeamById), new { teamId = createdTeam.TeamId }, createdTeam);
    }

    [HttpPut("{teamId:int}")]
    [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Put))]
    public async Task<IActionResult> UpdateTeam(int teamId, InsertTeamDto teamToUpdate)
    {
        if (await teamsRepository.UpdateTeamAsync(teamId, teamToUpdate))
        {
            return NoContent();
        }

        return NotFound();
    }

    [HttpDelete("{teamId:int}")]
    [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Delete))]
    public async Task<IActionResult> DeleteTeam(int teamId)
    {
        if (await teamsRepository.DeleteTeamAsync(teamId))
        {
            return Ok();
        }

        return NotFound();
    }

    [HttpPost("{teamId:int}/Members/")]
    [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Post))]
    public async Task<ActionResult<MemberDto>> InsertMember(int teamId, InsertMemberDto memberToInsert)
    {
        var createdMember = await teamsRepository.InsertMemberAsync(teamId, memberToInsert);
        if (createdMember is null)
        {
            return NotFound();
        }

        return CreatedAtAction(nameof(GetTeamById), new { teamId }, createdMember);
    }

    [HttpPut("{teamId:int}/Members/{memberId:int}")]
    [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Put))]
    public async Task<IActionResult> UpdateMember(int teamId, int memberId, InsertMemberDto memberToUpdate)
    {
        if (await teamsRepository.UpdateMemberAsync(teamId, memberId, memberToUpdate))
        {
            return NoContent();
        }

        return NotFound();
    }

    [HttpDelete("{teamId:int}/Members/{memberId:int}")]
    [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Delete))]
    public async Task<IActionResult> DeleteMember(int teamId, int memberId)
    {
        if (await teamsRepository.DeleteMemberAsync(teamId, memberId))
        {
            return Ok();
        }

        return NotFound();
    }
}
