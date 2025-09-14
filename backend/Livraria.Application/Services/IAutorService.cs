using Livraria.Application.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Livraria.Application.Services
{
    public interface IAutorService
    {
        Task<IEnumerable<AutorDto>> GetAllAsync();
        Task<AutorDto> GetByIdAsync(Guid id);
        Task<AutorDto> CreateAsync(AutorDto autorDto);
        Task<AutorDto> UpdateAsync(Guid id, AutorDto autorDto);
        Task<bool> DeleteAsync(Guid id);
    }
}