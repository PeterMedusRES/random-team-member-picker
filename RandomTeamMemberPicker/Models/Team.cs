namespace RandomTeamMemberPicker.Models;

public class Team
{
    public int TeamId { get; set; }

    public required string Name { get; set; }

    public ICollection<Member> Members { get; } = new List<Member>();
}
