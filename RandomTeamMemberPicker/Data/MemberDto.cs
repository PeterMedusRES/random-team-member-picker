namespace RandomTeamMemberPicker.Data;

public record MemberDto
{
    public required int MemberId { get; set; }

    public required string Name { get; set; }

    public required int TimesPicked { get; set; }
}
