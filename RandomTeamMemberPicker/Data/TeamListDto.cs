namespace RandomTeamMemberPicker.Data;

public record TeamListDto
{
    public required IEnumerable<TeamDto> Teams { get; set; }
}
