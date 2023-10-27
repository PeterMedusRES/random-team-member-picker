namespace RandomTeamMemberPicker.Models;

using System.ComponentModel.DataAnnotations;

public class Team
{
    public int TeamId { get; set; }

    [Required]
    public string? Name { get; set; }

    public ICollection<Member> Members { get; } = new List<Member>();
}
