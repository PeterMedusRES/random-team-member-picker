using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using RandomTeamMemberPicker.Models;

var builder = WebApplication.CreateBuilder(args);

var connectionString =
    builder.Configuration.GetConnectionString("Teams") ?? "Data Source=Teams.db";
builder.Services.AddSqlite<TeamDb>(connectionString);

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
    async (TeamDb db, int id) =>
    {
        var member = await db.Members.FindAsync(id);
        if (member is null)
        {
            return Results.NotFound();
        }

        return Results.Ok(member);
    }
);
app.MapGet("/members", async (TeamDb db) => await db.Members.ToListAsync());
app.MapPost(
    "/members",
    async (TeamDb db, Member member) =>
    {
        await db.Members.AddAsync(member);
        await db.SaveChangesAsync();
        return Results.Created($"/members/{member.MemberId}", member);
    }
);
app.MapPut(
    "/members",
    async (TeamDb db, Member update, int id) =>
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
    async (TeamDb db, int id) =>
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
