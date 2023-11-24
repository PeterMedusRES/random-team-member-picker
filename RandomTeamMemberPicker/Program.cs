using Microsoft.OpenApi.Models;
using RandomTeamMemberPicker.Models;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("Teams") ?? "Data Source=Teams.db";
builder.Services.AddSqlite<TeamDb>(connectionString);

builder.Services.AddControllers();

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

app.UseSwagger(c =>
{
    c.RouteTemplate = "/api/swagger/{documentName}/swagger.json";
});
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/api/swagger/v1/swagger.json", "Team Picker API v1");
    c.RoutePrefix = "api/swagger";
});

app.UseStaticFiles();

app.MapControllers();

app.MapFallbackToFile("index.html");

app.Run();
