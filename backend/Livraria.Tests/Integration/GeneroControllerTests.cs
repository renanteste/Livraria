using FluentAssertions;
using Livraria.Application.DTOs;
using System.Net;
using System.Net.Http.Json;
using Xunit;

namespace Livraria.Tests.Integration
{
    public class GeneroControllerTests : IClassFixture<CustomWebApplicationFactory>
    {
        private readonly HttpClient _client;

        public GeneroControllerTests(CustomWebApplicationFactory factory)
        {
            _client = factory.CreateClient();
        }

        [Fact]
        public async Task Post_DeveCriarGenero()
        {
            var genero = new GeneroDto { Nome = "Ficção" };

            var response = await _client.PostAsJsonAsync("/api/v1/genero", genero);

            response.StatusCode.Should().Be(HttpStatusCode.Created);

            var created = await response.Content.ReadFromJsonAsync<GeneroDto>();
            created!.Nome.Should().Be("Ficção");
        }

        [Fact]
        public async Task Get_DeveRetornarLista()
        {
            var response = await _client.GetAsync("/api/v1/genero");

            response.StatusCode.Should().Be(HttpStatusCode.OK);

            var lista = await response.Content.ReadFromJsonAsync<IEnumerable<GeneroDto>>();
            lista.Should().NotBeNull();
        }
    }
}

