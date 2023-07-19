using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using UserProject.Domain;

namespace UserProject.Infrastructure;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddBusinessLogic(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddManagers();
        return services;
    }

    private static IServiceCollection AddManagers(this IServiceCollection services)
    {
        services.AddScoped<IUserManager, UserManager>();
        return services;
    }
}
