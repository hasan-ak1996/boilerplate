using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using TestApp.Configuration;
using TestApp.Web;

namespace TestApp.EntityFrameworkCore
{
    /* This class is needed to run "dotnet ef ..." commands from command line on development. Not used anywhere else */
    public class TestAppDbContextFactory : IDesignTimeDbContextFactory<TestAppDbContext>
    {
        public TestAppDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<TestAppDbContext>();
            var configuration = AppConfigurations.Get(WebContentDirectoryFinder.CalculateContentRootFolder());

            TestAppDbContextConfigurer.Configure(builder, configuration.GetConnectionString(TestAppConsts.ConnectionStringName));

            return new TestAppDbContext(builder.Options);
        }
    }
}
