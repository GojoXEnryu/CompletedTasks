using CartProject.Domain;

namespace CartProject.Infrastructure;

public class CartManager : ICartManager
{
    private readonly CartContext _context;

    public CartManager(CartContext context)
    {
        _context = context;
    }

    public List<Cart> GetAllCarts()
    {
        return _context.Carts.ToList();
    }

    public List<long> GetAllProducts(long id)
    {
        var existingCart = _context.Carts.FirstOrDefault(x => x.Id == id);
        if (existingCart is null)
        {
            return null;
        }
        return existingCart.Products.ToList();
    }

    public Cart Create(Cart cart)
    {
        var entry = _context.Add(cart); _context.SaveChanges();
        return entry.Entity;
    }

    public Cart? Update(Cart cart)
    {
        var existingCart = _context.Carts.FirstOrDefault(x => x.Id == cart.Id);
        if (existingCart is null)
        {
            return null;
        }
        existingCart.UserId = cart.UserId;
        existingCart.Products = cart.Products;

        var entry = _context.Update(existingCart); _context.SaveChanges();
        return entry.Entity;
    }

    public List<Cart> DeleteAll()
    {
        foreach (Cart existingCart in _context.Carts)
        {
            if (existingCart is not null)
            {
                _context.Remove(existingCart);
            }
        }
        _context.SaveChanges();
        return _context.Carts.ToList();
    }

    public Cart? Delete(long id)
    {
        var existingCart = _context.Carts.FirstOrDefault(x => x.Id == id);
        if (existingCart is null)
        {
            return null;
        }

        var entry = _context.Remove(existingCart); _context.SaveChanges();
        return entry.Entity;
    }
}
