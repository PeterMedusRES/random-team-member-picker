using RandomTeamMemberPicker.Db;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc(
        "v1",
        new OpenApiInfo
        {
            Title = "Team Picker API",
            Description = "Randomly choose team members from your team",
            Version = "v1"
        }
    );
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Team Picker API v1");
});

app.MapGet("/", () => "Hello World!");

app.MapGet("/members/{id:int}", (int id) => MemberDb.GetMember(id));
app.MapGet("/members", () => MemberDb.GetMembers());
app.MapPost("/members", (Member member) => MemberDb.CreateMember(member));
app.MapPut("/members", (Member member) => MemberDb.UpdateMember(member));
app.MapDelete("/members/{id:int}", (int id) => MemberDb.RemoveMember(id));

app.Run();
