namespace RandomTeamMemberPicker.Data;

public record TeamDto
{
    public required int TeamId { get; set; }

    public required string Name { get; set; }

    public required int MemberCount { get; set; }
}
