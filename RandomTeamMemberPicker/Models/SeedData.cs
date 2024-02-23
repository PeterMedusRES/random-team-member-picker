namespace RandomTeamMemberPicker.Models;

using Bogus;

public static class SeedData
{
    public static readonly List<Team> Teams = [];

    public static readonly List<Member> Members = [];

    private static void AddTeam(Team team, List<Member> members)
    {
        var teamId = Teams.Count + 1;
        team.TeamId = teamId;

        var memberId = Members.Count + 1;
        foreach (var member in members)
        {
            member.MemberId = memberId++;
            member.TeamId = teamId;
        }

        Teams.Add(team);
        Members.AddRange(members);
    }

    private static void GenerateFakeTeams(int count)
    {
        var memberId = Members.Count + 1;
        var memberFaker = new Faker<Member>()
            .RuleFor(m => m.MemberId, _ => memberId++)
            .RuleFor(m => m.Name, f => f.Name.FirstName())
            .RuleFor(m => m.TimesPicked, f => f.Random.Number(0, 5));

        var teamId = Teams.Count + 1;
        var teamFaker = new Faker<Team>()
            .RuleFor(t => t.TeamId, _ => teamId++)
            .RuleFor(t => t.Name, f => f.Company.CompanyName())
            .RuleFor(t => t.Members, (_, t) =>
            {
                memberFaker.RuleFor(m => m.TeamId, _ => t.TeamId);

                var members = memberFaker.GenerateBetween(3, 8);

                Members.AddRange(members);

                return null!;
            });

        var teams = teamFaker.Generate(count);

        Teams.AddRange(teams);
    }

    public static void Init()
    {
        if (Teams.Count != 0 || Members.Count != 0)
        {
            return;
        }

        AddTeam(
            new Team
            {
                Name = "UNO Data Demos",
            },
            [
                new Member
                {
                    Name = "Peter",
                    TimesPicked = 4,
                },
                new Member
                {
                    Name = "Kieran",
                    TimesPicked = 2,
                },
                new Member
                {
                    Name = "Eddie",
                    TimesPicked = 3,
                },
                new Member
                {
                    Name = "Callum",
                    TimesPicked = 1,
                },
                new Member
                {
                    Name = "Juan",
                    TimesPicked = 0,
                },
                new Member
                {
                    Name = "Richard",
                    TimesPicked = 0,
                },
            ]
        );

        AddTeam(
            new Team
            {
                Name = "UNO Data Retros",
            },
            [
                new Member
                {
                    Name = "Peter",
                    TimesPicked = 3,
                },
                new Member
                {
                    Name = "Kieran",
                    TimesPicked = 2,
                },
                new Member
                {
                    Name = "Callum",
                    TimesPicked = 3,
                },
                new Member
                {
                    Name = "Colin",
                    TimesPicked = 0,
                },
                new Member
                {
                    Name = "Richard",
                    TimesPicked = 1,
                },
            ]
        );

        GenerateFakeTeams(5);
    }
}
