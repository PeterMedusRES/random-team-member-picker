namespace RandomTeamMemberPicker.Models;

public record MemberDto
{
    public required int MemberId { get; set; }

    public required string Name { get; set; }
}
