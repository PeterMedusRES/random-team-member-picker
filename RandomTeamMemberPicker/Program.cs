using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using RandomTeamMemberPicker.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<MemberDb>(options => options.UseInMemoryDatabase("members"));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc(
        "v1",
        new OpenApiInfo
        {
            Title = "Team Picker API",
            Description = "Randomly choose team members from your team",
            Version = "v1",
        }
    );
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Team Picker API v1");
});

app.MapGet(
    "/members/{id:int}",
    async (MemberDb db, int id) =>
    {
        var member = await db.Members.FindAsync(id);
        if (member is null)
        {
            return Results.NotFound();
        }

        return Results.Ok(member);
    }
);
app.MapGet("/members", async (MemberDb db) => await db.Members.ToListAsync());
app.MapPost(
    "/members",
    async (MemberDb db, Member member) =>
    {
        await db.Members.AddAsync(member);
        await db.SaveChangesAsync();
        return Results.Created($"/members/{member.Id}", member);
    }
);
app.MapPut(
    "/members",
    async (MemberDb db, Member update, int id) =>
    {
        var member = await db.Members.FindAsync(id);
        if (member is null)
        {
            return Results.NotFound();
        }

        member.Name = update.Name;
        await db.SaveChangesAsync();

        return Results.NoContent();
    }
);
app.MapDelete(
    "/members/{id:int}",
    async (MemberDb db, int id) =>
    {
        var member = await db.Members.FindAsync(id);
        if (member is null)
        {
            return Results.NotFound();
        }

        db.Members.Remove(member);
        await db.SaveChangesAsync();

        return Results.Ok();
    }
);

app.Run();
