namespace RandomTeamMemberPicker.Db;

public static class MemberDb
{
    private static List<Member> _members =
        new()
        {
            new() { Id = 1, Name = "Peter" },
            new() { Id = 2, Name = "Kieran" },
            new() { Id = 3, Name = "Juan" },
            new() { Id = 4, Name = "Eddie" },
            new() { Id = 5, Name = "Callum" },
        };

    public static List<Member> GetMembers()
    {
        return _members;
    }

    public static Member? GetMember(int id)
    {
        return _members.SingleOrDefault(member => member.Id == id);
    }

    public static Member CreateMember(Member member)
    {
        _members.Add(member);
        return member;
    }

    public static Member UpdateMember(Member update)
    {
        _members = _members
            .Select(member =>
            {
                if (member.Id == update.Id)
                {
                    member.Name = update.Name;
                }

                return member;
            })
            .ToList();

        return update;
    }

    public static void RemoveMember(int id)
    {
        _members = _members.FindAll(member => member.Id != id).ToList();
    }
}
