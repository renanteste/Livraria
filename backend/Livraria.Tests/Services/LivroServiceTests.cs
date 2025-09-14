using Xunit;
using Moq;
using Livraria.Domain.Entities;
using Livraria.Domain.Interfaces;
using Livraria.Application.DTOs;
using Livraria.Application.Services;

public class LivroServiceTests
{
    private readonly Mock<ILivroRepository> _repositoryMock;
    private readonly LivroService _service;

    public LivroServiceTests()
    {
        _repositoryMock = new Mock<ILivroRepository>();
        _service = new LivroService(_repositoryMock.Object);
    }

    [Fact]
    public async Task GetAllAsync_ShouldReturnLivrosWithIncludes()
    {
        // Arrange
        var livros = new List<Livro>
        {
            new Livro
            {
                Id = Guid.NewGuid(),
                Titulo = "Vidas Secas",
                Autor = new Autor { Nome = "Graciliano Ramos" },
                Genero = new Genero { Nome = "Romance" }
            }
        };

        _repositoryMock.Setup(r => r.GetAllWithIncludesAsync())
                       .ReturnsAsync(livros);

        // Act
        var result = await _service.GetAllAsync();

        // Assert
        Assert.Single(result);
        Assert.Equal("Graciliano Ramos", result.First().AutorNome);
        Assert.Equal("Romance", result.First().GeneroNome);
    }
}
