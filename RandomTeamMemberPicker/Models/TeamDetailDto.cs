namespace RandomTeamMemberPicker.Models;

public record TeamDetailDto
{
    public required int TeamId { get; set; }

    public required string Name { get; set; }

    public ICollection<MemberDto> Members { get; set; } = new List<MemberDto>();
}
