using ProductProject.Domain;

public static class ProductRouter
{
    public static WebApplication AddProductRouter(this WebApplication application)
    {
        var productGroup = application.MapGroup("/api/products");

        productGroup.MapGet(pattern: "/", handler: GetAllProducts);
        productGroup.MapGet(pattern: "/{id:long}", handler: GetAProduct);
        productGroup.MapPost(pattern: "/", handler: CreateProduct);
        productGroup.MapPut(pattern: "/", handler: UpdateProduct);
        productGroup.MapDelete(pattern: "/{id:long}", handler: Delete);

        return application;
    }

    private static IResult GetAllProducts(IProductManager productManager)
    {
        var products = productManager.GetAll();
        return Results.Ok(products);
    }

    private static IResult GetAProduct(long id, IProductManager productManager)
    {
        var products = productManager.GetProduct(id);
        return Results.Ok(products);
    }

    private static IResult CreateProduct(Product product, IProductManager productManager)
    {
        var createdProduct = productManager.Create(product);
        return Results.Ok(createdProduct);
    }

    private static IResult UpdateProduct(Product product, IProductManager productManager)
    {
        var updatedProduct = productManager.Update(product);
        return updatedProduct is null ? Results.NotFound() : Results.Ok(updatedProduct);
    }

    private static IResult Delete(long id, IProductManager productManager)
    {
        var delProduct = productManager.Delete(id);
        return delProduct is null ? Results.NotFound() :  Results.Ok(delProduct);
    }
}