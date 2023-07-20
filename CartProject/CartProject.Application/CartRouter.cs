using CartProject.Domain;
using Grpc.Net.Client;
using CartClientApp;
using System.Linq.Expressions;

public static class CartRouter
{
    public static WebApplication AddCartRouter(this WebApplication application)
    {
        var cartGroup = application.MapGroup("/api/carts");

        cartGroup.MapGet(pattern: "/", handler: GetAllCarts);
        cartGroup.MapGet(pattern: "/{id:long}", handler: GetAllProducts);
        cartGroup.MapPost(pattern: "/", handler: CreateCart);
        cartGroup.MapPut(pattern: "/", handler: UpdateCart);
        cartGroup.MapDelete(pattern: "/", handler: DeleteAllCarts);
        cartGroup.MapDelete(pattern: "/{id:long}", handler: Delete);

        return application;
    }

    private static IResult GetAllCarts(ICartManager cartManager)
    {
        var carts = cartManager.GetAllCarts();
        return Results.Ok(carts);
    }

    private static IResult GetAllProducts(long id, ICartManager cartManager)
    {
        var products = cartManager.GetAllProducts(id);
        return Results.Ok(products);
    }

    private static IResult CreateCart(Cart cart, ICartManager cartManager)
    {
        var createdCart = cartManager.Create(cart);
        return Results.Ok(createdCart);
    }

    private static async Task<IResult> UpdateCart(Cart cart, ICartManager cartManager)
    {
        using var userChannel = GrpcChannel.ForAddress("https://localhost:5555");
        using var productChannel = GrpcChannel.ForAddress("https://localhost:5557");
        var userClient = new CartCheck.CartCheckClient(userChannel);
        var productClient = new CartCheck.CartCheckClient(productChannel);

        var userReply = await userClient.DoesExistAsync(new IdRequest { Id = cart.UserId });
        if (userReply.Id == 0) return Results.NotFound();

        var productsReply = await productClient.DoesExistMultipleAsync(new IdRequestProducts { Ids = { cart.Products }, Counts = { } });
        List<long> products = new List<long>();

        for(int k = 0; k < productsReply.Ids.Count; k++)
        {
            if (productsReply.Ids[k] != 0 && productsReply.Counts[k] != 0)
            {
                products.Add(productsReply.Ids[k]);
            }
        }
        cart.Products = products; var updatedCart = cartManager.Update(cart);
        return updatedCart is null ? Results.NotFound() : Results.Ok(updatedCart);
    }

    private static IResult DeleteAllCarts(ICartManager cartManager)
    {
        var delCart = cartManager.DeleteAll();
        return delCart is null ? Results.NotFound() : Results.Ok(delCart);
    }

    private static IResult Delete(long id, ICartManager cartManager)
    {
        var delCart = cartManager.Delete(id);
        return delCart is null ? Results.NotFound() :  Results.Ok(delCart);
    }
}