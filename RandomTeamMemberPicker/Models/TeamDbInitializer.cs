namespace RandomTeamMemberPicker.Models;

using Microsoft.EntityFrameworkCore;

public class TeamDbInitializer(ModelBuilder modelBuilder)
{
    public void Seed()
    {
        modelBuilder
            .Entity<Team>()
            .HasData(
                new Team
                {
                    TeamId = 1,
                    Name = "UNO Data Demos",
                    LastPickedMemberId = null,
                }
            );

        modelBuilder
            .Entity<Team>()
            .HasData(
                new Team
                {
                    TeamId = 2,
                    Name = "UNO Data Retros",
                    LastPickedMemberId = null,
                }
            );

        // UNO Data Demos
        modelBuilder
            .Entity<Member>()
            .HasData(
                new Member
                {
                    MemberId = 1,
                    Name = "Peter",
                    TimesPicked = 4,
                    TeamId = 1,
                },
                new Member
                {
                    MemberId = 2,
                    Name = "Kieran",
                    TimesPicked = 2,
                    TeamId = 1,
                },
                new Member
                {
                    MemberId = 3,
                    Name = "Eddie",
                    TimesPicked = 3,
                    TeamId = 1,
                },
                new Member
                {
                    MemberId = 4,
                    Name = "Callum",
                    TimesPicked = 1,
                    TeamId = 1,
                },
                new Member
                {
                    MemberId = 5,
                    Name = "Juan",
                    TimesPicked = 0,
                    TeamId = 1,
                }
            );

        // UNO Data Retros
        modelBuilder
            .Entity<Member>()
            .HasData(
                new Member
                {
                    MemberId = 6,
                    Name = "Peter",
                    TimesPicked = 3,
                    TeamId = 2,
                },
                new Member
                {
                    MemberId = 7,
                    Name = "Kieran",
                    TimesPicked = 2,
                    TeamId = 2,
                },
                new Member
                {
                    MemberId = 8,
                    Name = "Callum",
                    TimesPicked = 3,
                    TeamId = 2,
                },
                new Member
                {
                    MemberId = 9,
                    Name = "Colin",
                    TimesPicked = 0,
                    TeamId = 2,
                },
                new Member
                {
                    MemberId = 10,
                    Name = "Richard",
                    TimesPicked = 1,
                    TeamId = 2,
                }
            );
    }
}
