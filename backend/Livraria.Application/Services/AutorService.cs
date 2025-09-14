using Livraria.Domain.Entities;
using Livraria.Domain.Interfaces;
using Livraria.Application.DTOs;
using System.Linq;
using System.Threading.Tasks;

namespace Livraria.Application.Services
{
    public class AutorService : IAutorService
    {
        private readonly IRepository<Autor> _repository;

        public AutorService(IRepository<Autor> repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<AutorDto>> GetAllAsync()
        {
            var autores = await _repository.GetAllAsync();
            return autores.Select(a => new AutorDto
            {
                Id = a.Id,
                Nome = a.Nome
            });
        }

        public async Task<AutorDto> GetByIdAsync(Guid id)
        {
            var autor = await _repository.GetByIdAsync(id);
            if (autor == null) throw new KeyNotFoundException("Autor não encontrado");
            return new AutorDto
            {
                Id = autor.Id,
                Nome = autor.Nome
            };
        }

        public async Task<AutorDto> CreateAsync(AutorDto autorDto)
        {
            var autor = new Autor
            {
                Id = autorDto.Id,
                Nome = autorDto.Nome
            };

            var created = await _repository.AddAsync(autor);
            return new AutorDto
            {
                Id = created.Id,
                Nome = created.Nome
            };
        }

        public async Task<AutorDto> UpdateAsync(Guid id, AutorDto autorDto)
        {
            var autor = await _repository.GetByIdAsync(id);
            if (autor == null) throw new KeyNotFoundException("Autor não encontrado");

            autor.Nome = autorDto.Nome;
            await _repository.UpdateAsync(autor);

            return autorDto;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            await _repository.DeleteAsync(id);
            return true;
        }
    }
}