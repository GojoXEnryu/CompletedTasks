using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace UserProject.Domain;

public class User
{
    [Key]
    public long Id { get; set; }

    public string Login { get; set; } = "";

    public string Password { get; set; } = "";

    public string EmailAddress { get; set; } = "";

    public string FirstName { get; set; } = "";

    public string LastName { get; set; } = "";

    public DateTime DateOfRegistration { get; } = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day);

    public long CartId { get; set; } = -1;

    public int BonusAmount { get; set; } = 0;
}