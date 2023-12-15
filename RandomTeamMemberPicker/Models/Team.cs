namespace RandomTeamMemberPicker.Models;

using System.ComponentModel.DataAnnotations;

public class Team
{
    public int TeamId { get; set; }

    [MaxLength(50)]
    [Required]
    public required string Name { get; set; }

    public int? LastPickedMemberId { get; set; } = null;

    public ICollection<Member> Members { get; } = new List<Member>();
}
