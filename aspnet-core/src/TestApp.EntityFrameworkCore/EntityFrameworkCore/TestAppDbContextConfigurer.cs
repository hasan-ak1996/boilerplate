using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace TestApp.EntityFrameworkCore
{
    public static class TestAppDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<TestAppDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<TestAppDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}
