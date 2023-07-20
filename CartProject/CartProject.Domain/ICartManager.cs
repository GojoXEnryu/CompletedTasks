using System.Runtime.InteropServices;

namespace CartProject.Domain;

public interface ICartManager
{
    List<Cart> GetAllCarts();

    List<long> GetAllProducts(long id);

    Cart Create(Cart cart);

    Cart? Update(Cart cart);

    List<Cart> DeleteAll();

    Cart? Delete(long id);

}
