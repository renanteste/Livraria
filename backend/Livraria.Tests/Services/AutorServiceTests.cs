using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;
using Moq;
using FluentAssertions; 
using Livraria.Domain.Entities;
using Livraria.Domain.Interfaces;
using Livraria.Application.DTOs;
using Livraria.Application.Services;

namespace Livraria.Tests.Services
{
    public class AutorServiceTests
    {
        private readonly Mock<IRepository<Autor>> _repositoryMock;
        private readonly AutorService _service;

        public AutorServiceTests()
        {
            _repositoryMock = new Mock<IRepository<Autor>>();
            _service = new AutorService(_repositoryMock.Object);
        }

        [Fact]
        public async Task GetAllAsync_ShouldReturnAllAuthors()
        {
            // Arrange
            var autores = new List<Autor>
            {
                new Autor { Id = Guid.NewGuid(), Nome = "Autor A" },
                new Autor { Id = Guid.NewGuid(), Nome = "Autor B" }
            };

            _repositoryMock.Setup(r => r.GetAllAsync()).ReturnsAsync(autores);

            // Act
            var result = (await _service.GetAllAsync()).ToList();

            // Assert
            result.Should().HaveCount(2);
            result.Select(a => a.Nome).Should().Contain(new[] { "Autor A", "Autor B" });
        }

        [Fact]
        public async Task GetByIdAsync_ShouldReturnAuthor_WhenExists()
        {
            // Arrange
            var id = Guid.NewGuid();
            var autor = new Autor { Id = id, Nome = "Autor X" };
            _repositoryMock.Setup(r => r.GetByIdAsync(id)).ReturnsAsync(autor);

            // Act
            var result = await _service.GetByIdAsync(id);

            // Assert
            result.Should().NotBeNull();
            result.Nome.Should().Be("Autor X");
        }

        [Fact]
        public async Task GetByIdAsync_ShouldThrow_WhenNotFound()
        {
            // Arrange
            var id = Guid.NewGuid();
            _repositoryMock.Setup(r => r.GetByIdAsync(id)).ReturnsAsync((Autor?)null);

            // Act / Assert
            await Assert.ThrowsAsync<KeyNotFoundException>(async () => await _service.GetByIdAsync(id));
        }

        [Fact]
        public async Task CreateAsync_ShouldReturnCreatedAuthor()
        {
            // Arrange
            var dto = new AutorDto { Nome = "Novo Autor" };
            var createdAutor = new Autor { Id = Guid.NewGuid(), Nome = "Novo Autor" };

            _repositoryMock.Setup(r => r.AddAsync(It.IsAny<Autor>())).ReturnsAsync(createdAutor);

            // Act
            var result = await _service.CreateAsync(dto);

            // Assert
            result.Should().NotBeNull();
            result.Nome.Should().Be("Novo Autor");
        }

        [Fact]
        public async Task UpdateAsync_ShouldThrow_WhenNotFound()
        {
            // Arrange
            var id = Guid.NewGuid();
            _repositoryMock.Setup(r => r.GetByIdAsync(id)).ReturnsAsync((Autor?)null);

            // Act / Assert
            await Assert.ThrowsAsync<KeyNotFoundException>(async () =>
                await _service.UpdateAsync(id, new AutorDto { Nome = "Qualquer" }));
        }

        [Fact]
        public async Task DeleteAsync_ShouldCallRepositoryDelete()
        {
            // Arrange
            var id = Guid.NewGuid();
            _repositoryMock.Setup(r => r.DeleteAsync(id)).Returns(Task.CompletedTask).Verifiable();

            // Act
            var result = await _service.DeleteAsync(id);

            // Assert
            result.Should().BeTrue();
            _repositoryMock.Verify(r => r.DeleteAsync(id), Times.Once);
        }
    }
}
