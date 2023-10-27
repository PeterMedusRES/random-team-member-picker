namespace RandomTeamMemberPicker.Controllers;

using Microsoft.AspNetCore.Mvc;
using RandomTeamMemberPicker.Models;

[Route("api/[controller]")]
[ApiController]
public class MembersController : ControllerBase
{
    private readonly TeamDb _db;

    public MembersController(TeamDb db)
    {
        _db = db;
    }

    [HttpGet]
    public IAsyncEnumerable<Member> GetAllMembers()
    {
        return _db.Members.AsAsyncEnumerable();
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetMemberById(int id)
    {
        var member = await _db.Members.FindAsync(id);
        if (member is null)
        {
            return NotFound();
        }

        return Ok(member);
    }

    [HttpPost]
    public async Task<IActionResult> InsertMember(Member member)
    {
        await _db.Members.AddAsync(member);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetMemberById), new { id = member.MemberId }, member);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateMember(Member update, int id)
    {
        var member = await _db.Members.FindAsync(id);
        if (member is null)
        {
            return NotFound();
        }

        member.Name = update.Name;
        await _db.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteMember(int id)
    {
        var member = await _db.Members.FindAsync(id);
        if (member is null)
        {
            return NotFound();
        }

        _db.Members.Remove(member);
        await _db.SaveChangesAsync();

        return Ok();
    }
}
