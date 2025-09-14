using Livraria.Domain.Entities;
using Livraria.Domain.Interfaces;
using Livraria.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Livraria.Infrastructure.Repositories
{
    public class LivroRepository : LivroRepository<Livro>, ILivroRepository
    {
        private readonly ApplicationDbContext _context;

        public LivroRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Livro>> GetAllWithIncludesAsync()
        {
            return await _context.Livros
                .Include(l => l.Autor)
                .Include(l => l.Genero)
                .ToListAsync();
        }

        public async Task<Livro?> GetByIdWithIncludesAsync(Guid id)
        {
            return await _context.Livros
                .Include(l => l.Autor)
                .Include(l => l.Genero)
                .FirstOrDefaultAsync(l => l.Id == id);
        }
    }
}
