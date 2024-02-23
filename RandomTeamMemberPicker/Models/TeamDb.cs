namespace RandomTeamMemberPicker.Models;

using Microsoft.EntityFrameworkCore;

public class TeamDb(DbContextOptions options) : DbContext(options)
{
    public DbSet<Team> Teams { get; set; } = null!;
    public DbSet<Member> Members { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        SeedData.Init();

        modelBuilder.Entity<Team>().HasData(SeedData.Teams);
        modelBuilder.Entity<Member>().HasData(SeedData.Members);
    }
}
