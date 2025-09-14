using Livraria.Domain.Entities;
using Livraria.Domain.Interfaces;
using Livraria.Application.DTOs;

namespace Livraria.Application.Services
{
    public class LivroService : ILivroService
    {
        private readonly ILivroRepository _repository;

        public LivroService(ILivroRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<LivroDto>> GetAllAsync()
        {
            var livros = await _repository.GetAllWithIncludesAsync();

            return livros.Select(l => new LivroDto
            {
                Id = l.Id,
                Titulo = l.Titulo,
                AutorId = l.AutorId,
                GeneroId = l.GeneroId,
                AutorNome = l.Autor?.Nome ?? string.Empty,
                GeneroNome = l.Genero?.Nome ?? string.Empty
            });
        }

        public async Task<LivroDto> GetByIdAsync(Guid id)
        {
            var livro = await _repository.GetByIdWithIncludesAsync(id);
            if (livro == null) throw new KeyNotFoundException("Livro não encontrado");

            return new LivroDto
            {
                Id = livro.Id,
                Titulo = livro.Titulo,
                AutorId = livro.AutorId,
                GeneroId = livro.GeneroId,
                AutorNome = livro.Autor?.Nome ?? string.Empty,
                GeneroNome = livro.Genero?.Nome ?? string.Empty
            };
        }

        public async Task<LivroDto> CreateAsync(LivroDto livroDto)
        {
            var livro = new Livro
            {
                Titulo = livroDto.Titulo,
                AutorId = livroDto.AutorId,
                GeneroId = livroDto.GeneroId
            };

            var created = await _repository.AddAsync(livro);
            return new LivroDto
            {
                Id = created.Id,
                Titulo = created.Titulo,
                AutorId = created.AutorId,
                GeneroId = created.GeneroId
            };
        }

        public async Task<LivroDto> UpdateAsync(Guid id, LivroDto livroDto)
        {
            var livro = await _repository.GetByIdAsync(id);
            if (livro == null) throw new KeyNotFoundException("Livro não encontrado");

            livro.Titulo = livroDto.Titulo;
            livro.AutorId = livroDto.AutorId;
            livro.GeneroId = livroDto.GeneroId;

            await _repository.UpdateAsync(livro);

            return livroDto;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            await _repository.DeleteAsync(id);
            return true;
        }
    }
}
