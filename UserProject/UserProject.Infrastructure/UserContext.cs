using Microsoft.EntityFrameworkCore;
using UserProject.Domain;

namespace UserProject.Infrastructure;

public sealed class UserContext : DbContext
{
    public DbSet<User> Users => Set<User>();

    public UserContext(DbContextOptions options) : base(options)
    {
        Database.Migrate();
    }
}