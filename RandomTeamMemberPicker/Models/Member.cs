namespace RandomTeamMemberPicker.Models;

public class Member
{
    public int MemberId { get; set; }

    public required string Name { get; set; }

    public int TeamId { get; set; }
    public Team Team { get; set; } = null!;
}
