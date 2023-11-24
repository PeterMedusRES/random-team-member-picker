namespace RandomTeamMemberPicker.Models;

using Microsoft.EntityFrameworkCore;

public class TeamDbInitializer
{
    private readonly ModelBuilder _modelBuilder;

    public TeamDbInitializer(ModelBuilder modelBuilder)
    {
        this._modelBuilder = modelBuilder;
    }

    public void Seed()
    {
        this._modelBuilder
            .Entity<Team>()
            .HasData(
                new Team
                {
                    TeamId = 1,
                    Name = "UNO Data",
                    LastPickedMemberId = null,
                }
            );

        this._modelBuilder
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
    }
}
