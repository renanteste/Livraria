using Livraria.Application.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Livraria.Application.Services
{
    public interface ILivroService
    {
        Task<IEnumerable<LivroDto>> GetAllAsync();
        Task<LivroDto> GetByIdAsync(Guid id);
        Task<LivroDto> CreateAsync(LivroDto livroDto);
        Task<LivroDto> UpdateAsync(Guid id, LivroDto livroDto);
        Task<bool> DeleteAsync(Guid id);
    }
}