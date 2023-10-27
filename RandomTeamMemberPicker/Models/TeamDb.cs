namespace RandomTeamMemberPicker.Models;

using Microsoft.EntityFrameworkCore;

public class TeamDb : DbContext
{
    public TeamDb(DbContextOptions options)
        : base(options) { }

    public DbSet<Team> Teams { get; set; } = null!;
    public DbSet<Member> Members { get; set; } = null!;
}
