using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RandomTeamMemberPicker.Migrations
{
    /// <inheritdoc />
    public partial class AddTimesPickedAndLastPicked : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "LastPickedMemberId",
                table: "Teams",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TimesPicked",
                table: "Members",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LastPickedMemberId",
                table: "Teams");

            migrationBuilder.DropColumn(
                name: "TimesPicked",
                table: "Members");
        }
    }
}
