using Grpc.Core;
using UserProject.Infrastructure;

namespace CartServiceApp.Services;

public class CartService : CartCheck.CartCheckBase
{
    private readonly UserContext _context;
    private readonly ILogger<CartService> _logger;
    public CartService(ILogger<CartService> logger, UserContext context)
    {
        _logger = logger;
        _context = context;
    }
    public override Task<IdReply> DoesExist(IdRequest request, ServerCallContext context)
    {
        UserManager newUM = new UserManager(_context);

        var reply = newUM.GetUserId(request.Id);

        return Task.FromResult(new IdReply
        {
            Id = reply
        });
    }
}
