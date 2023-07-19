using Microsoft.EntityFrameworkCore;
using CartProject.Domain;

namespace CartProject.Infrastructure;

public sealed class CartContext : DbContext
{
    public DbSet<Cart> Carts => Set<Cart>();

    public CartContext(DbContextOptions options) : base(options)
    {
        Database.Migrate();
    }
}