namespace RandomTeamMemberPicker.Models;

using Microsoft.EntityFrameworkCore;

public class MemberDb : DbContext
{
    public MemberDb(DbContextOptions options)
        : base(options) { }

    public DbSet<Member> Members { get; set; } = null!;
}
