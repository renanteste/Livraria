using Livraria.Application.DTOs;

namespace Livraria.Application.Services
{
    public interface IGeneroService
    {
        Task<IEnumerable<GeneroDto>> GetAllAsync();
        Task<GeneroDto> GetByIdAsync(Guid id);
        Task<GeneroDto> CreateAsync(GeneroDto generoDto);
        Task<GeneroDto> UpdateAsync(Guid id, GeneroDto generoDto);
        Task<bool> DeleteAsync(Guid id);
    }
}