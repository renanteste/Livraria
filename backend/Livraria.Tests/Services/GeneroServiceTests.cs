using Xunit;
using Moq;
using Livraria.Domain.Entities;
using Livraria.Domain.Interfaces;
using Livraria.Application.DTOs;
using Livraria.Application.Services;

public class GeneroServiceTests
{
    private readonly Mock<IRepository<Genero>> _repositoryMock;
    private readonly GeneroService _service;

    public GeneroServiceTests()
    {
        _repositoryMock = new Mock<IRepository<Genero>>();
        _service = new GeneroService(_repositoryMock.Object);
    }

    [Fact]
    public async Task GetByIdAsync_ShouldReturnGenero_WhenExists()
    {
        // Arrange
        var generoId = Guid.NewGuid();
        var genero = new Genero { Id = generoId, Nome = "Romance" };

        _repositoryMock.Setup(r => r.GetByIdAsync(generoId))
                       .ReturnsAsync(genero);

        // Act
        var result = await _service.GetByIdAsync(generoId);

        // Assert
        Assert.NotNull(result);
        Assert.Equal("Romance", result.Nome);
    }

    [Fact]
    public async Task GetByIdAsync_ShouldThrow_WhenNotFound()
    {
        // Arrange
        var generoId = Guid.NewGuid();
        _repositoryMock.Setup(r => r.GetByIdAsync(generoId))
                       .ReturnsAsync((Genero?)null);

        // Act & Assert
        await Assert.ThrowsAsync<KeyNotFoundException>(() => _service.GetByIdAsync(generoId));
    }

    [Fact]
    public async Task CreateAsync_ShouldReturnCreatedGenero()
    {
        // Arrange
        var dto = new GeneroDto { Nome = "Ficção" };
        var genero = new Genero { Id = Guid.NewGuid(), Nome = "Ficção" };

        _repositoryMock.Setup(r => r.AddAsync(It.IsAny<Genero>()))
                       .ReturnsAsync(genero);

        // Act
        var result = await _service.CreateAsync(dto);

        // Assert
        Assert.NotNull(result);
        Assert.Equal("Ficção", result.Nome);
    }
}
