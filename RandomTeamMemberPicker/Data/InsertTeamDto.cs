namespace RandomTeamMemberPicker.Data;

using System.ComponentModel.DataAnnotations;

public record InsertTeamDto
{
    [Required]
    public required string Name { get; set; }
}
