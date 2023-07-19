using UserProject.Domain;

namespace UserProject.Infrastructure;

public class UserManager : IUserManager
{
    private readonly UserContext _context;

    public UserManager(UserContext context)
    {
        _context = context;
    }

    public List<User> GetAll()
    {
        return _context.Users.ToList();
    }

    public User? Get(long id)
    {
        return _context.Users.FirstOrDefault(x => x.Id == id);
    }

    public long GetUserId(long userId)
    { 
        var existingUser = _context.Users.FirstOrDefault(x => (x.Id == userId));

        return existingUser == null ? 0 : existingUser.Id;
    }

    public User? Create(User user)
    {
        var existingUser = _context.Users.FirstOrDefault(x => (x.Login == user.Login) || (x.Login == user.EmailAddress) || (x.EmailAddress == user.Login) || (x.EmailAddress == user.EmailAddress));
        if (existingUser is not null)
        {
            return null;
        }
        var entry = _context.Add(user);

        _context.SaveChanges();
        return entry.Entity;
    }

    public User? Update(User user)
    {
        var existingUser = _context.Users.FirstOrDefault(x => x.Id == user.Id);
        if (existingUser is null)
        {
            return null;
        }
        existingUser.Login = user.Login;
        existingUser.Password = user.Password;
        existingUser.EmailAddress = user.EmailAddress;
        existingUser.FirstName = user.FirstName;
        existingUser.LastName = user.LastName;

        existingUser.CartId = user.CartId;
        existingUser.BonusAmount = user.BonusAmount;

        var entry = _context.Update(existingUser);
        _context.SaveChanges();
        return entry.Entity;
    }

    public List<User> DeleteAll()
    {
        foreach (User existingUser in _context.Users)
        {
            if (existingUser is not null)
            {
                _context.Remove(existingUser);
            }
        }
        _context.SaveChanges();
        return _context.Users.ToList();
    }

    public User? Delete(long id)
    {
        var existingUser = _context.Users.FirstOrDefault(x => x.Id == id);
        if (existingUser is null)
        {
            return null;
        }

        var entry = _context.Remove(existingUser);
        _context.SaveChanges();
        return entry.Entity;
    }
}
