namespace RandomTeamMemberPicker.Controllers;

using Microsoft.AspNetCore.Mvc;
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
    public IAsyncEnumerable<Team> GetAllTeams()
    {
        return _db.Teams.AsAsyncEnumerable();
    }

    [HttpGet("{id:int}")]
    [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Get))]
    public async Task<ActionResult<Team>> GetTeamById(int id)
    {
        var team = await _db.Teams.FindAsync(id);
        if (team is null)
        {
            return NotFound();
        }

        return Ok(team);
    }

    [HttpPost]
    [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Post))]
    public async Task<ActionResult<Team>> InsertTeam(Team team)
    {
        await _db.Teams.AddAsync(team);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetTeamById), new { id = team.TeamId }, team);
    }

    [HttpPut("{id:int}")]
    [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Put))]
    public async Task<IActionResult> UpdateTeam(Team update, int id)
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
}
