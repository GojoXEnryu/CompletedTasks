namespace UserProject.Domain;

public interface IUserManager
{
    List<User> GetAll();

    User? Get(long id);

    User? Create(User user);

    User? Update(User user);

    List<User> DeleteAll();

    User? Delete(long id);
}
