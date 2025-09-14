using FluentAssertions;
using Livraria.Application.DTOs;
using System.Net;
using System.Net.Http.Json;
using Xunit;

namespace Livraria.Tests.Integration
{
    public class AutorControllerTests : IClassFixture<CustomWebApplicationFactory>
    {
        private readonly HttpClient _client;

        public AutorControllerTests(CustomWebApplicationFactory factory)
        {
            _client = factory.CreateClient();
        }

        [Fact]
        public async Task Post_DeveCriarAutor()
        {
            var autor = new AutorDto { Nome = "Machado de Assis" };

            var response = await _client.PostAsJsonAsync("/api/v1/autor", autor);

            response.StatusCode.Should().Be(HttpStatusCode.Created);

            var created = await response.Content.ReadFromJsonAsync<AutorDto>();
            created!.Nome.Should().Be("Machado de Assis");
        }

        [Fact]
        public async Task Get_DeveRetornarLista()
        {
            var response = await _client.GetAsync("/api/v1/autor");

            response.StatusCode.Should().Be(HttpStatusCode.OK);

            var lista = await response.Content.ReadFromJsonAsync<IEnumerable<AutorDto>>();
            lista.Should().NotBeNull();
        }
    }
}

