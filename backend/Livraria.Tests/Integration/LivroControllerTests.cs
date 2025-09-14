using FluentAssertions;
using Livraria.Application.DTOs;
using System.Net;
using System.Net.Http.Json;
using Xunit;

namespace Livraria.Tests.Integration
{
    public class LivroControllerTests : IClassFixture<CustomWebApplicationFactory>
    {
        private readonly HttpClient _client;

        public LivroControllerTests(CustomWebApplicationFactory factory)
        {
            _client = factory.CreateClient();
        }

        [Fact]
        public async Task Post_DeveCriarLivro()
        {
            // Primeiro crie um autor e um gênero
            var autor = new AutorDto { Nome = "José Saramago" };
            var autorResp = await _client.PostAsJsonAsync("/api/v1/autor", autor);
            var createdAutor = await autorResp.Content.ReadFromJsonAsync<AutorDto>();

            var genero = new GeneroDto { Nome = "Romance" };
            var generoResp = await _client.PostAsJsonAsync("/api/v1/genero", genero);
            var createdGenero = await generoResp.Content.ReadFromJsonAsync<GeneroDto>();

            // Criação do livro
            var livro = new LivroDto
            {
                Titulo = "Ensaio sobre a cegueira",
                AutorId = createdAutor!.Id,
                GeneroId = createdGenero!.Id
            };

            var response = await _client.PostAsJsonAsync("/api/v1/livro", livro);

            response.StatusCode.Should().Be(HttpStatusCode.Created);

            var createdLivro = await response.Content.ReadFromJsonAsync<LivroDto>();
            createdLivro!.Titulo.Should().Be("Ensaio sobre a cegueira");
            createdLivro.AutorId.Should().Be(createdAutor.Id);
            createdLivro.GeneroId.Should().Be(createdGenero.Id);
        }

        [Fact]
        public async Task Get_DeveRetornarLista()
        {
            var response = await _client.GetAsync("/api/v1/livro");

            response.StatusCode.Should().Be(HttpStatusCode.OK);

            var lista = await response.Content.ReadFromJsonAsync<IEnumerable<LivroDto>>();
            lista.Should().NotBeNull();
        }
    }
}
