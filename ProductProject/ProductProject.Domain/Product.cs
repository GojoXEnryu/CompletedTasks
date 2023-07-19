using System.ComponentModel.DataAnnotations;

namespace ProductProject.Domain;

public class Product
{
    [Key]
    public long Id { get; set; }

    public int Count { get; set; } = 0;

    public string Name { get; set; } = "";

    public decimal Price { get; set; } = 0.00M;

    public string Description { get; set; } = "";

    public string Category { get; set; } = "";
}