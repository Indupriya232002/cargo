using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Sprint1_CargoManagement_Data.Migrations
{
    public partial class fifthcargo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "accessPasses",
                columns: table => new
                {
                    AccessId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UniqueAccess = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    EntryTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ExitTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TrukcId = table.Column<int>(type: "int", nullable: false),
                    EmpId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_accessPasses", x => x.AccessId);
                    table.ForeignKey(
                        name: "FK_accessPasses_employees_EmpId",
                        column: x => x.EmpId,
                        principalTable: "employees",
                        principalColumn: "EmpId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_accessPasses_EmpId",
                table: "accessPasses",
                column: "EmpId");

            migrationBuilder.CreateIndex(
                name: "IX_accessPasses_UniqueAccess",
                table: "accessPasses",
                column: "UniqueAccess",
                unique: true,
                filter: "[UniqueAccess] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "accessPasses");
        }
    }
}
