using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TestApp.Migrations
{
    public partial class initMigrationAttachment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "File",
                table: "Order");

            migrationBuilder.DropColumn(
                name: "FileName",
                table: "Order");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte[]>(
                name: "File",
                table: "Order",
                type: "varbinary(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FileName",
                table: "Order",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
