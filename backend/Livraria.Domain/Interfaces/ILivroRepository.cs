using Livraria.Domain.Entities;

namespace Livraria.Domain.Interfaces
{
    public interface ILivroRepository : IRepository<Livro>
    {
        Task<IEnumerable<Livro>> GetAllWithIncludesAsync();
        Task<Livro?> GetByIdWithIncludesAsync(Guid id);
    }
}
