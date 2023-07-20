using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using CartProject.Domain;

namespace CartProject.Infrastructure;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddBusinessLogic(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddManagers();
        return services;
    }

    private static IServiceCollection AddManagers(this IServiceCollection services)
    {
        services.AddScoped<ICartManager, CartManager>();
        return services;
    }
}
