using Microsoft.EntityFrameworkCore;
using ProductProject.Domain;

namespace ProductProject.Infrastructure;

public sealed class ProductContext : DbContext
{
    public DbSet<Product> Products => Set<Product>();

    public ProductContext(DbContextOptions options) : base(options)
    {
        Database.Migrate();
    }
}