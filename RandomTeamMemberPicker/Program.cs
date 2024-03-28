using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using RandomTeamMemberPicker;
using RandomTeamMemberPicker.Models;
using StackExchange.Redis;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<TeamDb>(options => options.UseInMemoryDatabase("Teams"));

var redisConnectionString = builder.Configuration.GetConnectionString("Redis");
builder.Services.AddSingleton<IConnectionMultiplexer>(ConnectionMultiplexer.Connect(redisConnectionString!));

builder.Services.AddScoped<ITeamsRepository, RedisTeamsRepository>();

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

// Make sure the seeded data is added to the in-memory db
using (var serviceScope = app.Services.CreateScope())
{
    var dbContext = serviceScope.ServiceProvider.GetRequiredService<TeamDb>();
    await dbContext.Database.EnsureCreatedAsync();
}

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
