using Livraria.Domain.Entities;
using Livraria.Domain.Interfaces;
using Livraria.Application.DTOs;

namespace Livraria.Application.Services
{
    public class GeneroService : IGeneroService
    {
        private readonly IRepository<Genero> _repository;

        public GeneroService(IRepository<Genero> repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<GeneroDto>> GetAllAsync()
        {
            var generos = await _repository.GetAllAsync();
            return generos.Select(g => new GeneroDto
            {
                Id = g.Id,
                Nome = g.Nome
            });
        }

        public async Task<GeneroDto> GetByIdAsync(Guid id)
        {
            var genero = await _repository.GetByIdAsync(id);
            if (genero == null) throw new KeyNotFoundException("Gênero não encontrado");
            return new GeneroDto
            {
                Id = genero.Id,
                Nome = genero.Nome
            };
        }

        public async Task<GeneroDto> CreateAsync(GeneroDto generoDto)
        {
            var genero = new Genero
            {
                Id = generoDto.Id,
                Nome = generoDto.Nome
            };

            var created = await _repository.AddAsync(genero);
            return new GeneroDto
            {
                Id = created.Id,
                Nome = created.Nome
            };
        }

        public async Task<GeneroDto> UpdateAsync(Guid id, GeneroDto generoDto)
        {
            var genero = await _repository.GetByIdAsync(id);
            if (genero == null) throw new KeyNotFoundException("Gênero não encontrado");

            genero.Nome = generoDto.Nome;
            await _repository.UpdateAsync(genero);

            return generoDto;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            await _repository.DeleteAsync(id);
            return true;
        }
    }
}
