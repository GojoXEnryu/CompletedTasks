using Google.Protobuf.Collections;
using Grpc.Core;
using ProductProject.Infrastructure;

namespace CartServiceApp.Services;

public class CartService : CartCheck.CartCheckBase
{
    private readonly ProductContext _context;
    private readonly ILogger<CartService> _logger;
    public CartService(ILogger<CartService> logger, ProductContext context)
    {
        _logger = logger;
        _context = context;
    }
    public override Task<IdReplyProducts> DoesExistMultiple(IdRequestProducts request, ServerCallContext context)
    {
        ProductManager newPM = new ProductManager(_context);

        long replyValue; int replyValueCounts;
        RepeatedField<long> replyProducts = new RepeatedField<long>();
        RepeatedField<int> replyCounts = new RepeatedField<int>();

        for (int k = 0; k < request.Ids.Count; k++)
        {
            replyValue = request.Ids[k];
            if (newPM.GetProduct(replyValue) == null)
            {
                replyValue = 0;
                replyValueCounts = 0;
            }
            else replyValueCounts = newPM.GetProduct(replyValue).Count;

            replyProducts.Add(replyValue);
            replyCounts.Add(replyValueCounts);
        }

        return Task.FromResult(new IdReplyProducts
        {
            Ids = { replyProducts }, Counts = { replyCounts }
        });
    }
}
