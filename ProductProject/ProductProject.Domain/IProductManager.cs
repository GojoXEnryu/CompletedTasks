using System.Runtime.InteropServices;

namespace ProductProject.Domain;

public interface IProductManager
{
    List<Product> GetAll();

    Product? GetProduct(long id);

    Product Create(Product product);

    Product? Update(Product product);

    Product? Delete(long id);

}
