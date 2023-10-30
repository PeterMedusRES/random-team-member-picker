namespace RandomTeamMemberPicker.Models;

public record TeamDto
{
    public required int TeamId { get; set; }

    public required string Name { get; set; }
}
