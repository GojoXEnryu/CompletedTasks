using System.ComponentModel.DataAnnotations;

namespace CartProject.Domain;

public class Cart
{
    [Key]
    public long Id { get; set; }

    public long UserId { get; set; }

    public List<long> Products { get; set; } = new List<long>();
}