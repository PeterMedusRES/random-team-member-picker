namespace RandomTeamMemberPicker.Models;

using System.ComponentModel.DataAnnotations;

public class Member
{
    public int MemberId { get; set; }

    [MaxLength(50)]
    [Required]
    public required string Name { get; set; }

    public int TimesPicked { get; set; } = 0;

    public int TeamId { get; set; }
    public Team Team { get; set; } = null!;
}
