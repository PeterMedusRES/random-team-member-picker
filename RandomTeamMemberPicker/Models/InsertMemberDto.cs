﻿namespace RandomTeamMemberPicker.Models;

using System.ComponentModel.DataAnnotations;

public record InsertMemberDto
{
    [Required]
    public required string Name { get; set; }
}
