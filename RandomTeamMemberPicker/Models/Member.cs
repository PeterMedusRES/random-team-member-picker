﻿namespace RandomTeamMemberPicker.Models;

using System.ComponentModel.DataAnnotations;

public class Member
{
    public int MemberId { get; set; }

    [Required]
    public string? Name { get; set; }

    public int TeamId { get; set; }
    public Team Team { get; set; } = null!;
}
