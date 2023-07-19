using ProductProject.Domain;

namespace ProductProject.Infrastructure;

public class ProductManager : IProductManager
{
    private readonly ProductContext _context;

    public ProductManager(ProductContext context)
    {
        _context = context;
    }

    public List<Product> GetAll()
    {
        return _context.Products.ToList();
    }

    public Product? GetProduct(long id)
    {
        return _context.Products.FirstOrDefault(x => x.Id == id);
    }

    public Product Create(Product product)
    {
        var entry = _context.Add(product); _context.SaveChanges();
        return entry.Entity;
    }

    public Product? Update(Product product)
    {
        var existingProduct = _context.Products.FirstOrDefault(x => x.Id == product.Id);
        if (existingProduct is null)
        {
            return null;
        }
        existingProduct.Count = product.Count;
        existingProduct.Name = product.Name;
        existingProduct.Price = product.Price;
        existingProduct.Description = product.Description;
        existingProduct.Category = product.Category;

        var entry = _context.Update(existingProduct); _context.SaveChanges();
        return entry.Entity;
    }
    public Product? Delete(long id)
    {
        var existingProduct = _context.Products.FirstOrDefault(x => x.Id == id);
        if (existingProduct is null)
        {
            return null;
        }

        var entry = _context.Remove(existingProduct); _context.SaveChanges();
        return entry.Entity;
    }
}
